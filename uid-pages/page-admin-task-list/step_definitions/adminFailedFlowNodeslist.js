const urlPrefix = 'build/dist/';
const url = urlPrefix + 'resources/index.html';
const defaultFilters = '&f=state=failed&d=rootContainerId&d=assigned_id';
const failedFlowNodesUrl = 'API/bpm/flowNode?';
const defaultRequestUrl = urlPrefix + failedFlowNodesUrl + 'c=20&p=0' + defaultFilters;
const processUrl = urlPrefix + 'API/bpm/process?';
const processFilters = 'c=999&p=0&o=displayName ASC';

given("The filter response {string} is defined", (filterType) => {
    cy.server();
    switch (filterType) {
        case 'default filter':
            createRouteWithResponse(defaultRequestUrl, '', 'failedFlowNodes5Route', 'failedFlowNodes5');
            break;
        case 'process name':
            createRouteWithResponse(processUrl, processFilters, 'processesRoute', 'processes');
            createRoute('&f=processId=8617198282405797017', 'generateRandomCasesRoute');

            createRouteWithResponse(processUrl, processFilters, 'emptyResultRoute', 'emptyResult');
            createRoute('&f=processId=8617198282405797018', 'unUsedProcessRoute');
            break;
        case 'sort by':
            createRoute('&o=name+ASC', 'sortByNameAscRoute');
            createRoute('&o=name+DESC', 'sortByNameDescRoute');
            createRoute('&o=lastUpdateDate+ASC', 'sortByUpdateDateAscRoute');
            createRoute('&o=lastUpdateDate+DESC', 'sortByUpdateDateDescRoute');
            break;
        case 'search by name':
            createRoute('&s=Alowscenario', 'searchRoute');
            createRouteWithResponse(defaultRequestUrl,'&s=Search term with no match', 'emptyResultRoute', 'emptyResult');
            break;
        default:
            throw new Error("Unsupported case");
    }

    function createRoute(queryParameter, routeName) {
        cy.route({
            method: 'GET',
            url: defaultRequestUrl + queryParameter,
        }).as(routeName);
    }

    function createRouteWithResponse(url, queryParameter, routeName, response) {
        let responseValue = undefined;
        if (response) {
            cy.fixture('json/' + response + '.json').as(response);
            responseValue = '@' + response;
        }

        cy.route({
            method: 'GET',
            url: url + queryParameter,
            response: responseValue
        }).as(routeName);
    }
});

when("I visit the failed flow nodes list page", () => {
    cy.visit(url);
});

when("I put {string} in {string} filter field", (filterValue, filterType) => {
    switch (filterType) {
        case 'process name':
            selectFilterContentTypeOption(filterValue);
            break;
        case 'sort by':
            selectSortByOption(filterValue);
            break;
        case 'search':
            searchForValue(filterValue);
            break;
        default:
            throw new Error("Unsupported case");
    }

    function selectFilterContentTypeOption(filterValue) {
        switch (filterValue) {
            case 'All processes (all versions)':
                cy.get('select').eq(0).select('0');
                cy.wait('@generateRandomCasesRoute');
                break;
            case 'generateRandomCases (1.0)':
                cy.get('select').eq(0).select('1');
                break;
            case 'New vacation request with means of transportation (2.0)':
                cy.get('select').eq(0).select('2');
                cy.wait('@unUsedProcessRoute');
                break;
            default:
                throw new Error("Unsupported case");
        }
    }

    function selectSortByOption(filterValue) {
        switch (filterValue) {
            case 'Flow node name (Asc)':
                cy.get('select').eq(1).select('0');
                break;
            case 'Flow node name (Desc)':
                cy.get('select').eq(1).select('1');
                break;
            case 'Failed on (Newest first)':
                cy.get('select').eq(1).select('2');
                break;
            case 'Failed on (Oldest first)':
                cy.get('select').eq(1).select('3');
                break;
            default:
                throw new Error("Unsupported case");
        }
    }

    function searchForValue(filterValue) {
        cy.get('pb-input input').type(filterValue);
    }
});

when("I erase the search filter", () => {
    cy.get('pb-input input').clear();
});

then("The failed flow nodes list have the correct information", () => {
    cy.get('.task-item').eq(0).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Low');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60002');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('ALowScenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('ALowScenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('3001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('generateRandomCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('generateRandomCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(1).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Lowest');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60003');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A Lowest Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A Lowest Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('4001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('generateCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('generateCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(2).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Highest');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60004');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A Highest Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A Highest Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('5001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('cases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('Cases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(3).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('High');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60005');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A High Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A High Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('6001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('donotgenerateRandomCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('Do not generateRandomCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(4).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Normal');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60006');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A Normal Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A Normal Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('7001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('donotgenerateCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('Do not generateCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
});

then("A list of {string} failed flow nodes is displayed", (nbrOfFailedFlowNodes) => {
    cy.get('.task-item').should('have.length', nbrOfFailedFlowNodes);
});

then("The api call is made for {string}", (filterValue) => {
    switch (filterValue) {
        case 'generateRandomCases (1.0)':
            cy.wait('@processesRoute');
            break;
        case 'New vacation request with means of transportation (2.0)':
            cy.wait('@emptyResultRoute');
            break;
        case 'Flow node name (Asc)':
            cy.wait('@sortByNameAscRoute');
            break;
        case 'Flow node name (Desc)':
            cy.wait('@sortByNameDescRoute');
            break;
        case 'Failed on (Newest first)':
            cy.wait('@sortByUpdateDateDescRoute');
            break;
        case 'Failed on (Oldest first)':
            cy.wait('@sortByUpdateDateAscRoute');
            break;
        case 'Alowscenario':
            cy.wait('@searchRoute');
            break;
        default:
            throw new Error("Unsupported case");
    }
});

then("No tasks are available", () => {
    cy.get('.task-item').should('have.length', 0);
    cy.contains('No failed flow nodes to display').should('be.visible');
});