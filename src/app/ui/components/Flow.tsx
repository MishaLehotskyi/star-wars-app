import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { Hero } from "@/app/lib/types/hero";
import { Film } from "@/app/lib/types/film";
import HeroNode from "@/app/ui/components/HeroNode";
import FilmNode from "@/app/ui/components/FilmNode";
import ShipNode from "@/app/ui/components/ShipNode";
import { Ship } from "@/app/lib/types/ship";
import turnDataIntoNodesAndEdges from "@/app/lib/utils/turnDataIntoNodesAndEdges";

export default function Flow({ hero, films, ships } : { hero: Hero | null, films: Film [], ships: Ship [] }) {
    const { heroNode, heroEdges, filmNodes, filmEdges, shipNodes } = turnDataIntoNodesAndEdges(hero, films, ships);

    const nodes = [
        heroNode,
        ...filmNodes,
        ...shipNodes,
    ];

    const edges = [
        ...heroEdges,
        ...filmEdges,
    ]

    const nodeTypes = { heroNode: HeroNode, filmNode: FilmNode, shipNode: ShipNode };

    return (
        <div className="h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
