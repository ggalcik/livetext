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
                "I asked Jesus to help me put together some shelves and he said he didn't know how."
            ]
    },
    {
        'The Other Mike':
            [
                "Because my tax dollars are sending crows to crow school.",
                "Because the numbers didn't really mean anything and the island was just purgatory all along."
            ]
    }, 
    {
        'DX Josh':
        [
            "The remote isn't working and spinning the batteries isn't helping anymore."
        ]
    }, 
    {
        'geomiles61':
        [
            "The council rejected my request for my landscaping plans with a burning bush theme."
        ]
    }, 
    {
        'Gray eyes':
        [
            "I forgot all of the Mason handshakes and now I have to buy my babies at full price."
        ]
    }, 
    {
        'WithoutClaire':
        [
            "Because Noah took a pair of koalas on the ark, and those things are bastards."
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
    "If you were able to ask Jesus one question, what would it be?"
]

export const christolyzerQuestions = [
    "Is it acceptable to pray for Mary's intercession?",
    "Is it possible for non-Christians to get into heaven?",
    "Is it a sin to be homosexual?",
    "Are we all guilty of Adam's sin?",
    "Does God make choices about what is good?",
    "Did Noah's flood actually happen as a historical event?",
    "Was the world literally created in six days (as we commonly measure days)?",
    "Is Hell a metaphysical place of eternal, conscious torment?",
    "Does the bread of the Eucharist become the actual body of Christ?",
    "Is it necessary for another human to be involved in the process of confessing your sins?",
    "Is the Bible without error in all that is written?",
    "Should a Christian approve generally of the work that the ICE agency is doing in America?"
]