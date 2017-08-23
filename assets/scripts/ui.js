'use strict'
const showAllRunsTemplate = require('./templates/show-all-runs.handlebars')
const store = require('./store')

const createRunSuccess = (data) => {
  $('.create-run-modal-header').text('Successfully saved route.')
  $('.create-run').val('')
  console.log(data)
}

const createRunFailure = (error) => {
  $('.create-run-modal-header').text('There was an error saving your route.')
  $('.create-run').val('')
  console.error(error.responseText)
}

const showAllRunsSuccess = (data) => {
  console.log(data)
  store.runs = data.runs
  $('#display').empty()
  const showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  $('#display').append(showAllRunsHtml)
}

const showAllRunsFailure = (error) => {
  console.error(error.responseText)
}

const showAllMyRunsSuccess = (data) => {
  console.log(data)
  store.runs = data.runs
  $('#display').empty()
  const showAllRunsHtml = showAllRunsTemplate({ runs: data.runs })
  $('#display').append(showAllRunsHtml)
}

const showAllMyRunsFailure = (error) => {
  console.error(error.responseText)
}

const deleteRunSuccess = (data) => {
  console.log(data)
}

const deleteRunFailure = (error) => {
  console.error('within deleteFail, error is ' + error.responseText)
}

module.exports = {
  createRunSuccess,
  createRunFailure,
  showAllRunsSuccess,
  showAllRunsFailure,
  showAllMyRunsSuccess,
  showAllMyRunsFailure,
  deleteRunSuccess,
  deleteRunFailure
}
