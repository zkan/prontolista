import { generate_random_string } from '../support/commands.js'

context('Testruns', () => {
  let random_string
  let project_name
  let testcase_name

  beforeEach(() => {
    const baseUrl = Cypress.config().baseUrl

    cy.clearCookies()
    random_string = generate_random_string(5)
    project_name = `Test Project ${random_string}`
    testcase_name = `Test Test case ${random_string}`
    cy.login()

    // create project
    cy.get('div.app-projects a.addlink').click()
    cy.get('#id_name').type(project_name)
    cy.get('input.default').click()
    cy.visit(baseUrl)

    // create test case
    cy.get('div.app-testcases a.addlink').click()
    cy.get('#id_name').type(testcase_name)
    cy.get('#id_project').select(project_name)
    cy.get('input.default').click()
    cy.visit(baseUrl)
  })

  it('should be able to create a new test run', () => {
    cy.get('div.app-testruns a.addlink').click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#id_project').select(project_name)
    cy.get('#id_testinstance_set-0-testcase').select(
      `${project_name}: ${testcase_name}`,
    )
    cy.get('#id_testinstance_set-0-assignee').type(`Assignee ${random_string}`)
    cy.get('#id_testinstance_set-0-status').select('passed')
    cy.get('input.default').click()
    cy.get(':nth-child(1) > .field-name').should(
      'have.text',
      `Test new test run ${random_string}`,
    )
    cy.get(':nth-child(1) > .field-project').should('have.text', project_name)
  })

  it('should be able to edit a test run', () => {
    cy.get('div.app-testruns a.addlink').click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#id_project').select(project_name)
    cy.get('#id_testinstance_set-0-testcase').select(
      `${project_name}: ${testcase_name}`,
    )
    cy.get('#id_testinstance_set-0-assignee').type(`Assignee ${random_string}`)
    cy.get('#id_testinstance_set-0-status').select('passed')
    cy.get('input.default').click()
    cy.get(':nth-child(1) > .field-id > a').click()
    cy.get('#id_name')
      .clear()
      .type(`Edit test run ${random_string}`)
    cy.get('#id_testinstance_set-0-assignee')
      .clear()
      .type(`Edit Assignee ${random_string}`)
    cy.get('#id_testinstance_set-0-status').select('failed')
    cy.get('input.default').click()
    cy.get(':nth-child(1) > .field-name').should(
      'have.text',
      `Edit test run ${random_string}`,
    )
  })

  it('should be able to search a test run', () => {
    cy.get('div.app-testruns a.addlink').click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#id_project').select(project_name)
    cy.get('#id_testinstance_set-0-testcase').select(
      `${project_name}: ${testcase_name}`,
    )
    cy.get('#id_testinstance_set-0-assignee').type(`Assignee ${random_string}`)
    cy.get('#id_testinstance_set-0-status').select('passed')
    cy.get('input.default').click()
    cy.get('#searchbar').type(random_string)
    cy.get('#changelist-search > div > [type="submit"]').click()
    cy.get(':nth-child(1) > .field-name').should(
      'have.text',
      `Test new test run ${random_string}`,
    )
  })

  it('should be able to filter test run by project', () => {
    cy.get('div.app-testruns a.addlink').click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#id_project').select(project_name)
    cy.get('#id_testinstance_set-0-testcase').select(
      `${project_name}: ${testcase_name}`,
    )
    cy.get('#id_testinstance_set-0-assignee').type(`Assignee ${random_string}`)
    cy.get('#id_testinstance_set-0-status').select('passed')
    cy.get('input.default').click()
    cy.contains(project_name).click()
  })
})
