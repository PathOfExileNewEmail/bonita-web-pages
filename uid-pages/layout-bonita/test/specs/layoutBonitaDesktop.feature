Feature: The Bonita layout in desktop resolution

  Scenario: The Bonita layout is running
    Given I have the "appName1" application selected
    When I visit the index page
    Then The application displayName is "app1"
    And The "first" page displayName is "process"
    And The "second" page displayName is "home"

  Scenario: The Bonita layout shows the user icon correctly
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    Then I see "../API/avatars/1" as the user menu icon

  Scenario: The Bonita layout shows the first and last name and not the user name
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    Then I see "Walter Bates" as the user name
    And I see "../API/avatars/1" as the user menu icon
    And I don't see "walter.bates" as the user name


  Scenario: The Bonita layout shows the user name when a firstname isn't available
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user doesn't have a "firstname" info available
    When I visit the index page
    Then I see "walter.bates" as the user name

  Scenario: The Bonita layout shows the user name when a lastname isn't available in mobile resolution
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user doesn't have a "lastname" info available
    When I visit the index page
    Then I see "walter.bates" as the user name

  Scenario: The Bonita layout shows the app selection correctly
    Given I have the "appName1" application selected
    When I visit the index page
    Then I see the app selection icon

  Scenario: The Bonita layout image has the correct source
    Given I have the "appName1" application selected
    Given A logo is available in the theme
    When I visit the index page
    Then The image has the correct source

  Scenario: The Bonita layout image is not displayed
    Given I have the "appName1" application selected
    When I visit the index page
    Then The image is not displayed

  Scenario: The Bonita layout shows the current session modal
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the user name
    Then The current session modal is visible

  Scenario: The current session modal is shown correctly without sso
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the user name
    Then The current session modal is visible
    And The user first and last name "Walter Bates" are visible
    And The user name "walter.bates" is shown
    And The user email "walter.bates@email.com" is shown
    And The language select is visible
    And The logout button is visible
    And The save and cancel buttons are visible

  Scenario: The current session modal is shown correctly with sso
    Given I have the "appName1" application selected
    And A user is connected with sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the user name
    Then The current session modal is visible
    And The logout button is hidden

  Scenario: The current session modal has the user icon correctly set
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the user name
    Then The current session modal is visible
    And I see "../API/avatars/1" as the user modal icon

  Scenario: The current session modal show default user icon if empty
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first, a last name, but no image defined
    When I visit the index page
    And I click the user name
    Then The current session modal is visible
    And I see "../theme/icons/default/icon_user.png" as the user modal icon

  Scenario: The current session modal show the default user icon
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a default icon
    When I visit the index page
    And I click the user name
    Then The current session modal is visible
    And I see "../theme/icons/default/icon_user.png" as the user modal icon

  Scenario: The language is changed in current session modal
    Given I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And I have languages available
    When I visit the index page
    And I click the user name
    Then The current session modal is visible
    And The save button is disabled
    When I select "Français" in language picker
    Then The save button is enabled
    When I press the save button
    Then The language in BOS_Locale is "fr"

  Scenario: The app selection modal is shown correctly
    Given I have the "appName1" application selected
    And Multiple applications are available for the user
    When I visit the index page
    And I click the app selection icon
    Then The app selection modal is visible
    And I see my apps

  Scenario: The app selection modal filter works correctly
    Given I have the "appName1" application selected
    And Multiple applications are available for the user
    And The filter responses is defined
    When I visit the index page
    And I click the app selection icon
    Then The app selection modal is visible
    When I filter the app selection by "My first"
    Then I see only the filtered applications
    When I erase the input field
    And I filter the app selection by "app1"
    Then I see only the filtered applications
    When I erase the input field
    And I filter the app selection by "1.0.5"
    Then I see only the filtered applications

  Scenario: The app selection modal closes correctly
    Given I have the "appName1" application selected
    And Multiple applications are available for the user
    When I visit the index page
    And I click the app selection icon
    Then The app selection modal is visible
    When I click the close button
    Then The app selection modal is not visible

  Scenario: The app description popup is shown correctly
    Given I have the "appName1" application selected
    And Multiple applications are available for the user
    When I visit the index page
    And I click the app selection icon
    Then The app selection modal is visible
    And The app description should be correct