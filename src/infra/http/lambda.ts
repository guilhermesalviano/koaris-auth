import { app } from './app'

import { APIGatewayEvent, Context } from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'

const server = awsServerlessExpress.createServer(app)

// Lambda handler function
export const handler = (event: APIGatewayEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context)
}