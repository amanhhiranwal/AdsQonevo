pipeline {
    agent any

    // Triggers the job when Jenkins receives a push event from GitHub
    triggers {
        githubPush()
    }

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
            // Ensures execution only occurs on pushes to the main branch
            when {
                branch 'main'
            }
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
            when {
                branch 'main'
            }
            steps {
                sh "rsync -avz --exclude='.git' ./ ${DEPLOY_DIR}/"
            }
        }

        stage('Restart Services') {
            when {
                branch 'main'
            }
            steps {
                dir("${DEPLOY_DIR}/server") {
                    sh """
                    if [ -f "${DEPLOY_DIR}/server.env" ]; then
                        export \$(cat ${DEPLOY_DIR}/server.env | xargs)
                    elif [ -f "${DEPLOY_DIR}/server/.env" ]; then
                        export \$(cat ${DEPLOY_DIR}/server/.env | xargs)
                    fi
                    PORT=3012 pm2 restart "qonevo-backend" --update-env || PORT=3012 pm2 start index.js --name "qonevo-backend" --update-env
                    """
                }

                dir("${DEPLOY_DIR}/client") {
                    sh """
                    if [ -f "${DEPLOY_DIR}/client.env" ]; then
                        export \$(cat ${DEPLOY_DIR}/client.env | xargs)
                    elif [ -f "${DEPLOY_DIR}/client/.env.local" ]; then
                        export \$(cat ${DEPLOY_DIR}/client/.env.local | xargs)
                    fi
                    PORT=3013 pm2 restart "qonevo-frontend" --update-env || PORT=3013 pm2 start npm --name "qonevo-frontend" --update-env -- start
                    """
                }
            }
        }
    }

    post {
        always {
            sh 'pm2 save'
        }
        success {
            echo "Successfully deployed panels.qonevo.in on push to main!"
        }
        failure {
            echo "Pipeline failed! Check Jenkins logs for details."
        }
    }
}
