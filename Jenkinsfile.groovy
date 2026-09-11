pipeline {
    agent any

    environment {
        DEPLOY_DIR = '/var/www/Ads/Qonevo'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install, Lint & Build') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('client') { 
                            sh 'npm install'
                            sh 'npm run lint' 
                            sh 'npm run build' 
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('server') { 
                            sh 'npm install'
                            sh 'npm run lint' 
                        }
                    }
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                // Sync new code directly to the local folder (no SSH required)
                sh "rsync -avz --exclude='.git' ./ ${DEPLOY_DIR}/"
            }
        }

        stage('Restart Services') {
            steps {
                // Start or Restart Backend
                dir("${DEPLOY_DIR}/server") {
                    sh """
                    export \$(cat ${DEPLOY_DIR}/server.env | xargs) && \
                    PORT=3016 pm2 start index.js --name "qonevo-backend" --update-env || pm2 restart "qonevo-backend" --update-env
                    """
                }

                // Start or Restart Frontend
                dir("${DEPLOY_DIR}/client") {
                    sh """
                    export \$(cat ${DEPLOY_DIR}/client.env | xargs) && \
                    PORT=3015 pm2 start npm --name "qonevo-frontend" --update-env -- start || pm2 restart "qonevo-frontend" --update-env
                    """
                }
            }
        }
    }

    post {
        always {
            // Saves the PM2 process list so it survives server reboots
            sh 'pm2 save'
        }
        success {
            echo "Successfully deployed panels.qonevo.in locally!"
        }
        failure {
            echo "Pipeline failed! Check Jenkins logs for linting or build errors."
        }
    }
}
