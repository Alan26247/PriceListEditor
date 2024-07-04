pipeline {
    agent any

    stages {
        stage('BuildFrontend') {
            steps {
                sh "npm install --prefix Front"
                sh "CI=false npm run build:prod --prefix Front"
            }
        }
        stage('BuildContainer') {
            steps {
                sh "docker build --tag price-list-editor --build-arg ENVIRONMENT=Production ."
            }
        }
    }
}