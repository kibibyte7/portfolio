import { JSX } from "react";
import { useTerminalStore } from "../store/store";
import { projects } from "../projects/projects";

export interface Commande {
    name: string,
    description: string,
    run: (args: string[]) => JSX.Element[]
}

const { setIsProjectOpen, setSelectedProject, setCommandHistory, setHistoryIndex } = useTerminalStore.getState();

export const commandes: Commande[] = [
    {
        name: "help",
        description: "Affiche la page d'aide",
        run: function () {
            return [
                <div>
                    <div>Page d'aide</div>
                    {commandes.map((commande) => (
                        <div className="flex space-x-1" key={crypto.randomUUID()}>
                            <span className="text-yellow-500">{commande.name}</span>
                            <span>-</span>
                            <span>{commande.description}</span>
                        </div>
                    ))}
                </div>
            ]
        }
    },
    {
        name: "open",
        description: "Ouvre la page d'un projet",
        run: function (args) {
            const project = projects.find(p => p.name === args[0].toLowerCase());
            if (project) {
                setSelectedProject(project);
                setIsProjectOpen(true);
                return [
                    <div>Projet {project.displayName} ouvert !</div>
                ]
            } else {
                return [<div key="notfound" className="text-red-500">Projet introuvable. Utilise <span className="text-yellow-300">list</span> pour voir les projets disponibles.</div>];
            }
        }
    },
    {
        name: "list",
        description: "Donne la liste des projets disponibles",
        run: function () {
            let response = [];
            for (let i = 0; i < projects.length; i++) {
                response.push(
                    <div className="flex space-x-1">
                        <span className="text-yellow-300">{`${projects[i].displayName} (${projects[i].name})`}</span>
                        <span>-</span>
                        <span>{projects[i].shortDescription}</span>
                    </div>
                )
            }
            return response;
        }
    },
    {
        name: "random",
        description: "Ouvre un projet aléatoirement",
        run: function () {
            const project = projects[Math.floor(Math.random() * projects.length)];
            setSelectedProject(project);
            setIsProjectOpen(true);
            return [<div>Projet {project.displayName} ouvert aléatoirement ! 🎲</div>];
        }
    },
    {
        name: "date",
        description: "Retourne la date du jour",
        run: function () {
            return [<div>La date du jour est: {new Date().toLocaleString()}</div>];
        }
    },
    {
        name: "echo",
        description: "Affiche l'entrée utilisateur dans le terminal",
        run: function (args) {
            return [<div>{args.join(" ")}</div>];
        }
    },
    {
        name: "uuid",
        description: "Génère un UUID aléatoire",
        run: function () {
            return [<div>UUID aléatoire: {crypto.randomUUID()}</div>];
        }
    },
];