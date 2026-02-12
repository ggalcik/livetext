type RheazonEntry = Record<string, readonly string[]>;
export type Rheason = { person: string; saying: string };

export const rheazonsData: RheazonEntry[] = [
    {
        'Rev Rhizic, Emperor of Antifa':
            [
                "The power of the holy spirit isn't enough to open this pickle jar.",
                "My toaster keeps burning the Virgin Mary into my bread.",
                "The cat keeps spelling 'He is Risen!' when she walks across the keyboard.",
                "I keep committing sins, but Jesus keeps forgiving me.",
                "The neighbor's Wi-Fi is named 'JesusLovesYou' & it has stronger signal than mine.",
                "I keep getting 'Hogwarts Letters' but I don't believe in magic either.",
                "The demon that steals all the left socks.",
                "I can't eat Trix anymore, because I'm not a kid.",
                "Caught a leprechaun, but all he gave me was an AOL disc with 180 free hours of internet.",
                "I can't break par at mini-golf.",
                "If my anger gets below 55% I'm rigged to explode!",
                "Jesus leaves my messages on read but never replies.",
            ]
    },
    {
        'Greg dePlume':
            [
                "Because I really needed help from Jesus, but when I turned around there was only one set of footprints. He ran off when I needed him the most!",
                "The kids are walking on my azaleas again.",
                "You become an atheist, you get the anger for free.",
                "It's a tautology! A = A, where A = anger, and A = Atheist.",
                "If I wasn't angry, then what would all the Reddit atheists say about me?",
                "I want to be taken seriously, but my tiny legs make me look ridiculous.",
            ]
    }
]

function flattenRheazons(data: readonly RheazonEntry[]): Rheason[] {
    const out: Rheason[] = [];

    for (const entry of data) {
        const keys = Object.keys(entry);
        for (const person of keys) {
            const sayings = entry[person] ?? [];
            for (const saying of sayings) out.push({ person, saying });
        }
    }

    return out;
}

export const rheazons = flattenRheazons(rheazonsData);

export const hypothetichecks = [
    "If your child was blind and you told them 'you can play with any of your toys, but not the red ones', how would you punish them for playing with the red ones?",
    "If God told you to do something that you thought was disgusting, would you do it?",
    "If you died tomorrow and saw God and he said you can ask him any single question you wanted, what would you ask?",
    "Was Satan forgiven when Jesus was crucified?",
    "Could God have made coveting okay?",
    "If you saw someone being mugged and you had the ability to stop it, should you?",
    "In the year 200 BC, how many hundreds of years did people own slaves with God's permission?"
]