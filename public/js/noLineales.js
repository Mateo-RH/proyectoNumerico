const niterIncremental = document.querySelector('#niterIncremental');
const x0Incremental = document.querySelector('#x0Incremental');
const deltaIncremental = document.querySelector('#deltaIncremental');
const functionFincremental = document.querySelector('#functionFincremental');

const niterFixedPoint = document.querySelector('#niterFixedPoint');
const x0FixedPoint = document.querySelector('#x0FixedPoint');
const errorFixedPoint = document.querySelector('#errorFixedPoint');
const functionFFixedPoint = document.querySelector('#functionFFixedPoint');
const toleranceFixedPoint = document.querySelector('#toleranceFixedPoint');
const functionGFixedPoint = document.querySelector('#functionGFixedPoint');

const niterNewton = document.querySelector('#niterNewton');
const x0Newton = document.querySelector('#x0Newton');
const errorNewton = document.querySelector('#errorNewton');
const functionFNewton = document.querySelector('#functionFNewton');
const toleranceNewton = document.querySelector('#toleranceNewton');
const functionDNewton = document.querySelector('#functionDNewton');

function showBusquedas() {
  hideAll();
  $('#incrementalSearchForm')
    .removeClass('d-none')
    .addClass('d-block');
}
function showFixedPoint() {
  hideAll();
  $('#FixedPointForm')
    .removeClass('d-none')
    .addClass('d-block');
}
function showNewton() {
  hideAll();
  $('#NewtonForm')
    .removeClass('d-none')
    .addClass('d-block');
}
function showSecant() {
  hideAll();
  $('#SecantForm')
    .removeClass('d-none')
    .addClass('d-block');
}
function showMultipleRoots() {
  hideAll();
  $('#MultipleRootsForm')
    .removeClass('d-none')
    .addClass('d-block');
}
function showBisection() {
  hideAll();
  $('#BisectionForm')
    .removeClass('d-none')
    .addClass('d-block');
}
function showFakeRule() {
  hideAll();
  $('#FakeRuleForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function hideAll() {
  $('#incrementalSearchForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#FixedPointForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#NewtonForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#SecantForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#MultipleRootsForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#BisectionForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#FakeRuleForm')
    .removeClass('d-block')
    .addClass('d-none');
}
