Feature: Ecommerse Validiations

    Background: User Logs In
        Given User is logged into the website using "admin" and "admin123"

    Scenario: Placing the order
        Given User lands on dashboard page
        When User Click on new Transaction using "Deposit" "Checking Account - $2,500.00" "Primary Savings - $5,000.00" "1000" "IDK" "true" and submit it
        Then Transaction is completed , Print the last transaction record
        And Close the browser