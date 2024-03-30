import { Film } from "@/app/lib/types/film";
import { v4 as uuidv4 } from "uuid";
import { Hero } from "@/app/lib/types/hero";
import { Ship } from "@/app/lib/types/ship";
import { FilmNode, HeroNode, ShipNode } from "@/app/lib/types/nodes";
import { Edge } from "@/app/lib/types/edges";

export default function turnDataIntoNodesAndEdges(hero: Hero | null, films: Film[], ships: Ship[]) {
  let coordsS = { x: 0, y: 1000 };
  let coordsF = { x: 0, y: 350 };

  const heroNode = createHeroNode(hero);
  const { filmNodes, heroEdges } = createFilmNodesAndEdges(films, heroNode, coordsF);
  const { shipNodes, filmEdges } = createShipNodesAndEdges(films, ships, filmNodes, coordsS);

  return { heroNode, heroEdges, filmNodes, filmEdges, shipNodes };
}

function createHeroNode(hero: Hero | null): HeroNode {
  return {
    id: '1',
    data: { heroSourceHandleIds: [], hero },
    position: { x: 300, y: 0 },
    type: 'heroNode',
  };
}

function createFilmNodesAndEdges(films: Film[], heroNode: HeroNode, coordsF: { x: number; y: number }): { filmNodes: FilmNode[]; heroEdges: Edge[] } {
  const filmNodes: FilmNode[] = [];
  const heroEdges: Edge[] = [];

  for (const film of films) {
    const node = createFilmNode(film, coordsF);
    filmNodes.push(node);

    const sourceHandle = uuidv4();
    const edge = createEdge(heroNode.id, node.id, sourceHandle);
    heroEdges.push(edge);

    heroNode.data.heroSourceHandleIds.push(sourceHandle);
  }

  return { filmNodes, heroEdges };
}

function createFilmNode(film: Film, coordsF: { x: number; y: number }): FilmNode {
  const node: FilmNode = {
    id: uuidv4(),
    data: { filmSourceHandleIds: [], film },
    position: { ...coordsF },
    type: 'filmNode',
  };

  coordsF.x += 300;
  return node;
}

function createEdge(source: string, target: string, sourceHandle: string): Edge {
  return { id: uuidv4(), source, target, sourceHandle, animated: true };
}

function createShipNodesAndEdges(films: Film[], ships: Ship[], filmNodes: FilmNode[], coordsS: { x: number; y: number }): { shipNodes: ShipNode[]; filmEdges: Edge[] } {
  const shipNodes: ShipNode[] = [];
  const filmEdges: Edge[] = [];

  for (const ship of ships) {
    const node = createShipNode(ship, coordsS);
    shipNodes.push(node);

    for (const filmNode of filmNodes) {
      if (filmNode.data.film.starships.includes(ship.id)) {
        const sourceHandle = uuidv4();
        const edge = createEdge(filmNode.id, node.id, sourceHandle);
        filmEdges.push(edge);

        filmNode.data.filmSourceHandleIds.push(sourceHandle);
      }
    }
  }

  return { shipNodes, filmEdges };
}

function createShipNode(ship: Ship, coordsS: { x: number; y: number }): ShipNode {
  const node: ShipNode = {
    id: uuidv4(),
    data: { shipSourceHandleIds: [], ship },
    position: { ...coordsS },
    type: 'shipNode',
  };

  coordsS.x += 300;
  return node;
}
