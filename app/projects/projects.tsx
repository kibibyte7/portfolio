export interface Project {
    name: string;
    displayName: string;
    shortDescription: string;
    description: string;
    detailTech: string;
    temps: string;
    images: string[];
    url?: string;
}

export const projects: Project[] = [
    {
        name: "smarttask",
        displayName: "SmartTask",
        description: "SmartTask est une app de gestion des tâches assisté par une intelligence artificielle. Le but est de créer un contexte de projet et l'IA doit générer les tâches qui se trouveront dans le board, ainsi qu'une liste d'étapes pouvant aider à sa completion. Il s'agit d'un projet que j'ai choisi de faire dans le cadre de mon projet TPI de 4ème année, je suis fier de ce que j'ai pu accomplir durant ses deux semaines de travail.",
        shortDescription:"Un gestionnaire des tâches assité par une intelligeance artificielle.",
        detailTech: "Next.js, Java Spring Boot, MySQL",
        temps: "55 heures de travail",
        images: [
            "/images/smarttask1.png",
            "/images/smarttask2.png"
        ]
    },
    {
        name: "overlay",
        displayName: "Overlay",
        description: "Il s'agit d'un projet consistant à développer un overlay pour ma chaine de streaming Twitch. OBS (un logiciel courament utilisé pour lancer des lives) permet d'utiliser des sources de navigateurs pour enrichir l'écran de stream (la partie visible pour un viewer). Le thème de l'overlay est basé sur un jeu vidéo nommé Warframe et une des mises à jour nommée: Warframe: 1999, il s'agit d'une interface que l'on voit dans un ordinateur qu'on appelle le POM-2 PC. Voici une liste de ce qui a été développé: L'écran de lancement du stream, Le cadre qui entoure mon avatar dans l'écran de stream, Le cadre qui entoure mon avatar dans l'écran d'intermission (généralement utilisé pour annoncer quelque chose à son audiance), L'écran de pause, L'écran de fin de stream et enfin l'animation de transition lorsqu'on change de scène.",
        shortDescription:"Inspiré de Warframe: 1999, conçu pour OBS avec HTML/CSS/JS.",
        detailTech: "HTML, CSS, JS",
        temps: "20 heures de travail environ",
        images: [
            "/images/overlay1.png",
            "/images/overlay2.png",
            "/images/overlay3.png",
            "/images/overlay4.png",
            "/images/overlay5.png",
        ],
        url: "https://twitch.tv/kibibyte7",
    },
    {
        name: "modminecraft",
        displayName: "Mod Minecraft",
        description: "Un mod minecraft agit comme une extension du jeu, on peut ajouter des objets, des entités ect... Le mod en question ajoute des outils qui améliore la survie et la rends plus rapide. Il y a un système de quêtes donnant des récompenses, et ces récompenses permettent de fabriquer des armes magiques.",
        shortDescription:"Un mod qui agit comme une extension du jeu Minecraft.",
        detailTech: "Java, Minecraft Forge",
        temps: "65 heures de travail environ",
        images: [
            "/images/minecraft1.png",
            "/images/minecraft2.png",
            "/images/minecraft3.png",
            "/images/minecraft4.png",
            "/images/minecraft5.png",
            "/images/minecraft6.png",
            "/images/minecraft7.png",
            "/images/minecraft8.png",
            "/images/minecraft9.png",
            "/images/minecraft10.png",
            "/images/minecraft11.png",
        ]
    },
];