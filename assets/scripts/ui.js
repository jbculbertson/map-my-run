'use strict'
const showAllRunsTemplate = require('./templates/show-all-runs.handlebars')
// const store = require('./store')

const createRunSuccess = (data) => {
  console.log(data)
}

const createRunFailure = (error) => {
  console.error(error.responseText)
}

const showAllRunsSuccess = (data) => {
  console.log(data)
  let showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  $('#display').append(showAllRunsHtml)
}

const showAllRunsFailure = (error) => {
  console.error(error.responseText)
}

module.exports = {
  createRunSuccess,
  createRunFailure,
  showAllRunsSuccess,
  showAllRunsFailure
}
