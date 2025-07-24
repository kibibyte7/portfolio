"use client"
import { Minus, Square, X } from "lucide-react";
import { JSX, useEffect, useRef, useState } from "react";
import { Project, projects } from "./projects/projects";

export default function Home() {
  const [terminalHistory, setTerminalHistory] = useState<JSX.Element[]>([
    <div>
      Bienvenue dans mon portfolio ! Tapez <span className="text-yellow-300 font-semibold">help</span> pour commencer.
    </div>
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handlePrev = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedProject) {
      if (currentMediaIndex < selectedProject.images.length - 1) {
        setCurrentMediaIndex(currentMediaIndex + 1);
      }
    }
  };

  const handleClose = () => {
    console.log("Fermer projet")
    setSelectedProject(undefined);
    setCurrentMediaIndex(0);
    setIsProjectOpen(false);
  }

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    setCommandHistory((prev) => [...prev, command]);

    setTerminalHistory((prev) => [
      ...prev,
      (
        <div className="flex space-x-2">
          <div>
            <span className="text-green-400 font-semibold">ludo@kibibyte</span>
            <span className="text-white font-semibold">:</span>
            <span className="text-sky-600 font-semibold">/portfolio</span>
            <span className="text-white">$</span>
          </div>
          <span>{cmd}</span>
        </div>
      ),
      ...getCommandResponse(command),
    ]);
  };

  const getCommandResponse = (command: string): JSX.Element[] => {
    if (command === "help") {
      return [
        <div key="h1">Commandes disponibles :</div>,
        <div key="h2">- <span className="text-yellow-300">help</span>: Affiche cette page</div>,
        <div key="h3">- <span className="text-yellow-300">open &lt;nom&gt;</span>: Ouvre un projet</div>,
        <div key="h4">- <span className="text-yellow-300">list</span>: Liste les projets</div>,
        <div key="h5">- <span className="text-yellow-300">clear</span>: Efface l'historique du terminal</div>,
      ];
    }

    if (command.startsWith("open")) {
      const args = command.split(" ");

      const project = projects.find(p => p.name === args[1].toLowerCase());
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

    if (command === "list") {
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

    if (command === "random") {
      const project = projects[Math.floor(Math.random() * projects.length)];
      setSelectedProject(project);
      setIsProjectOpen(true);
      return [<div>Projet {project.displayName} ouvert aléatoirement ! 🎲</div>];
    }    

    if (command === "about") {
      return [];
    }

    if (command === "clear") {
      setTerminalHistory([]);
      setCommandHistory([]);
      setHistoryIndex(0);
      return [];
    }

    return [<div key="err">Commande inconnue : {command}</div>];
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  return (
    <div className="h-screen p-3 bg-gradient-to-tr from-[#972c34] to-[#AE3228] font-mono overflow-hidden">
      <div className="rounded-t-lg h-full">
        <div className="h-7 bg-gradient-to-b from-[#56544C] to-[#3E3D38] rounded-t-lg flex justify-between p-1">
          <div></div>
          <h3 className="font-semibold">
            ludo@kibibyte:/portfolio
          </h3>
          <div className="flex space-x-1">
            <div className="flex justify-center items-center border border-black bg-gradient-to-b from-[#8A8983] to-[#52514d] rounded-full w-5 h-5">
              <Minus size={16} className="text-black" />
            </div>
            <div className="flex justify-center items-center border border-black bg-gradient-to-b from-[#8A8983] to-[#52514d] rounded-full w-5 h-5">
              <Square size={13} className="text-black" />
            </div>
            <div className="flex justify-center items-center border border-black bg-gradient-to-b from-[#EE7953] to-[#DF5130] rounded-full w-5 h-5">
              <X size={16} className="text-black" />
            </div>
          </div>
        </div>
        <div className="h-full max-h-170 bg-[#2D0C22] overflow-y-auto p-2">
          {terminalHistory.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputValue);
              setInputValue("");
            }}
            className="flex items-center space-x-2"
          >
            <div>
              <span className="text-green-400 font-semibold">ludo@kibibyte</span>
              <span className="text-white font-semibold">:</span>
              <span className="text-sky-600 font-semibold">/portfolio</span>
              <span className="text-white">$</span>
            </div>
            <input
              className="bg-transparent text-white outline-none flex-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (commandHistory.length === 0) return;

                  const index = historyIndex === null
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                  console.log(index)
                  setHistoryIndex(index);
                  setInputValue(commandHistory[index] ?? "");
                }

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (commandHistory.length === 0) return;

                  const index = historyIndex === null
                    ? 0
                    : Math.min(commandHistory.length - 1, historyIndex + 1);
                  console.log(index)
                  setHistoryIndex(index);
                  setInputValue(commandHistory[index] ?? "");
                }
              }}
              autoFocus
            />
            <div ref={terminalEndRef}></div>
          </form>
        </div>
      </div>
      {selectedProject && (
        <div className="fixed mx-auto inset-1 bg-[#1c1c1c] text-white p-6 rounded-lg w-[1000px] max-w-[90%] overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">{selectedProject.displayName}</h2>
          <p className="text-sm italic text-gray-300 mb-4">
            {selectedProject.detailTech} – {selectedProject.temps}
          </p>
          <div className="overflow-y-auto">

            <p className="mb-4">{selectedProject.description}</p>

            {/* Carousel d’images */}
            <div className="flex justify-center items-center mb-4">
              <div className="mb-4">
                {/* Image affichée */}
                <div className="relative  flex justify-center items-center">
                  <img
                    src={selectedProject.images[currentMediaIndex]}
                    alt={`Aperçu ${currentMediaIndex + 1}`}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg border border-gray-600 object-cover shadow-lg"
                  />

                  {/* Boutons navigation */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-80"
                  >
                    ◀
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-80"
                  >
                    ▶
                  </button>
                </div>

                {/* Pagination bullets */}
                <div className="flex justify-center mt-2 space-x-2">
                  {selectedProject.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentMediaIndex ? 'bg-white' : 'bg-gray-500'} transition-all`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {selectedProject.url && (
              <div className="flex space-x-1">
                <span>Voir le fonctionnement via cet URL:</span>
                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                  <span className="bg-gradient-to-r from-[#9900ff] to-[#ff00b3] bg-clip-text text-transparent underline">
                    {selectedProject.url}
                  </span>
                </a>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button className="bg-red-500 p-1 rounded-lg hover:bg-red-400 transition-all hover:cursor-pointer" onClick={handleClose}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}