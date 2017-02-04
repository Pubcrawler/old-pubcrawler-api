# Abandoned stack

## pubcrawler-api
RESTful API for pubcrawler

### API endpoints

#### Version
###### GET /api/version
Yields current API version

#### Me
###### GET /api/me
Yields data about the authenticated user, otherwise 401 error.


### Authentication endpoints

#### auth/facebook
Authenticates the user through facebook.




### Configuration: src/config.yml
```
default:
  values:
    bodyLimit: '100kb'
    corsHeaders: ['Link']
    sessionSecret: 'session-secret-here'
  database:
    db: 'pubcrawl'
  server:
    host: 'localhost'
    port: 8080
development:
  database:
  user: 'user_test'
  pass: 'password_test'
    host: '127.0.0.1'
    port: 27017 # default mongodb port
  facebook:
    appId: 'facebook-app-id-here'
    secret: 'facebook-secret-here'
    callbackUrl: 'callback-url-here'
production:
  server:
    port: 80
  database:
    user: 'user_prod'
    pass: 'password_prod'
    port: 5000 # prod port
```
