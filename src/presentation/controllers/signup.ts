import type { HttpRequest, HttpResponse } from '../protocols/http'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/email-validator'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(String(httpRequest.body.email)) // 👈 TODO: Remove string parse adding type
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return { body: 'Ok', statusCode: 200 }
    } catch (err) {
      return serverError()
    }
  }
}
