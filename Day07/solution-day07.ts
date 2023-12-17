import { readFileSync } from 'fs'

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
type HandType = 'Five of a Kind' | 'Four of a Kind' | 'Full House' | 'Three of a Kind' | 'Two Pair' | 'One Pair' | 'High Card';

interface Hand {
    cards: Card[];
    bid: number;
    type: HandType;
    rank: number;
}

function readInputFile(filePath: string): Hand[] {
    const lines = readFileSync(filePath, 'utf-8').split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
        const [handStr, bidStr] = line.split(' ');
        return {
            cards: handStr.split('') as Card[],
            bid: parseInt(bidStr),
            type: getHandType(handStr),
            rank: 0
        };
    });
}

function getHandType(handStr: string): HandType {
    const counts = new Map<Card, number>();
    for (const card of handStr) {
        counts.set(card, (counts.get(card) || 0) + 1);
    }

    const uniqueCounts = Array.from(counts.values()).sort((a, b) => b - a);

    switch (uniqueCounts[0]) {
        case 5:
            return 'Five of a Kind';
        case 4:
            return 'Four of a Kind';
        case 3:
            return uniqueCounts[1] === 2 ? 'Full House' : 'Three of a Kind';
        case 2:
            return uniqueCounts[1] === 2 ? 'Two Pair' : 'One Pair';
        default:
            return 'High Card';
    }
}

function rankHands(hands: Hand[]): void {
    hands.sort((a, b) => compareHands(a, b));
}

function compareHands(a: Hand, b: Hand): number {
    const handStrength = {
        'High Card': 1,
        'One Pair': 2,
        'Two Pair': 3,
        'Three of a Kind': 4,
        'Full House': 5,
        'Four of a Kind': 6,
        'Five of a Kind': 7
    };

    if (handStrength[a.type] !== handStrength[b.type]) {
        return handStrength[b.type] - handStrength[a.type];
    }

    const cardStrength = {
        '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, 'T': 9, 'J': 10, 'Q': 11, 'K': 12, 'A': 13
    };

    for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] !== b.cards[i]) {
            return cardStrength[b.cards[i]] - cardStrength[a.cards[i]];
        }
    }

    return 0;
}

function calculateTotalWinnings(hands: Hand[]): number {
    let totalWinnings = 0;
    hands.forEach((hand, index) => {
        hand.rank = hands.length - index;
        totalWinnings += hand.bid * hand.rank;
    });
    return totalWinnings;
}

function main() {
    const filePath = 'input.txt';
    const hands = readInputFile(filePath);
    rankHands(hands);
    const totalWinnings = calculateTotalWinnings(hands);
    console.log(`Total Winnings: ${totalWinnings}`);
}

main();

