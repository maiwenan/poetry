'use strict';

const { Service } = require('egg');

class ErrorService extends Service {
  projectFields(data, fields = '', spliter = /\s+/) {
    const result = Object.assign({}, data);

    fields = fields.split(spliter);
    fields.forEach(field => {
      delete result[field];
    });

    return result;
  }

  handleServerError(error) {
    this.ctx.throw(500, error.message, { error });
  }

  handleMongooseError(error) {
    let status = 500;
    const message = error.message;
    const err400 = [
      'ValidationError',
      'CastError',
    ];

    if (err400.indexOf(error.name) !== -1) {
      status = 400;
    }

    this.ctx.throw(status, message, { error });
  }
}

module.exports = ErrorService;
