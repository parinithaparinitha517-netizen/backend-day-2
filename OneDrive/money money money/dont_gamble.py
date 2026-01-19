import random

def deposit():
    while True:
        amount = input("How much would you like to deposit? $ ")
        if amount.isdigit():
            amount = int(amount)
            if amount > 0:
                print(f"You have successfully deposited ${amount}.")
                return amount
            else:
                print("Amount must be greater than zero.")
        else:
            print("Please enter a valid number.")

def get_bet(balance):
    while True:
        bet = input(f"Enter your bet amount (Available: ${balance}): $ ")
        if bet.isdigit():
            bet = int(bet)
            if 0 < bet <= balance:
                return bet
            else:
                print("Bet must be within your balance.")
        else:
            print("Please enter a valid number.")

def spin():
    return random.randint(1, 3), random.randint(1, 3), random.randint(1, 3)

def check_win(slots):
    return slots[0] == slots[1] == slots[2]

def play_game():
    balance = deposit()

    while balance > 0:
        print("\n Spinning the slot machine...")
        bet = get_bet(balance)
        slots = spin()
        print(f"Result: {slots[0]} | {slots[1]} | {slots[2]}")

        if check_win(slots):
            winnings = bet * 5
            balance += winnings
            print(f" You won ${winnings}! New balance: ${balance}")
        else:
            balance -= bet
            print(f" You lost ${bet}. Remaining balance: ${balance}")

        if balance == 0:
            print("You're out of money! Game over.")
            break

        play_again = input("Play again? (y/n): ").lower()
        if play_again != 'y':
            print(f"You left with ${balance}. Thanks for playing!")
            break

play_game()