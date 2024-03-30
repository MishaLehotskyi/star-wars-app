import { Ship } from "@/app/lib/types/ship";
import { Handle, Position } from "reactflow";

interface Props {
  data: { ship: Ship },
}

export default function ShipNode({ data }: Props) {
  const { name, model, starship_class, manufacturer, cost_in_credits, length, crew, passengers, max_atmosphering_speed, hyperdrive_rating, MGLT, cargo_capacity, consumables} = data.ship;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <Handle type="target" position={Position.Top} />
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="mt-2">
        <p><span className="font-semibold">Model:</span> {model}</p>
        <p><span className="font-semibold">Class:</span> {starship_class}</p>
        <p><span className="font-semibold">Manufacturer:</span> {manufacturer}</p>
        <p><span className="font-semibold">Cost:</span> {cost_in_credits}</p>
        <p><span className="font-semibold">Length:</span> {length}</p>
        <p><span className="font-semibold">Crew:</span> {crew}</p>
        <p><span className="font-semibold">Passengers:</span> {passengers}</p>
        <p><span className="font-semibold">Max Speed:</span> {max_atmosphering_speed}</p>
        <p><span className="font-semibold">Hyperdrive Rating:</span> {hyperdrive_rating}</p>
        <p><span className="font-semibold">MGLT:</span> {MGLT}</p>
        <p><span className="font-semibold">Cargo Capacity:</span> {cargo_capacity}</p>
        <p><span className="font-semibold">Consumables:</span> {consumables}</p>
      </div>
    </div>
    );
}
