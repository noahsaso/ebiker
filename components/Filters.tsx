interface FiltersProps {
  maxDistance: number;
  minBikes: number;
  onMaxDistanceChange: (distance: number) => void;
  onMinBikesChange: (bikes: number) => void;
}

export default function Filters({
  maxDistance,
  minBikes,
  onMaxDistanceChange,
  onMinBikesChange,
}: FiltersProps) {
  return (
    <div className="flex gap-4 mt-4">
      <div className="flex-1 flex flex-col">
        <label htmlFor="maxDistance" className="block mb-1.5 text-sm text-gray-600 font-medium">Max Distance</label>
        <select
          id="maxDistance"
          value={maxDistance}
          onChange={(e) => onMaxDistanceChange(parseFloat(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md text-base grow"
        >
          <option value="0.5">0.5 miles</option>
          <option value="1">1 mile</option>
          <option value="2">2 miles</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
        </select>
      </div>
      <div className="flex-1 flex flex-col">
        <label htmlFor="minBikes" className="block mb-1.5 text-sm text-gray-600 font-medium">Min E-Bikes</label>
        <select
          id="minBikes"
          value={minBikes}
          onChange={(e) => onMinBikesChange(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md text-base grow"
        >
          <option value="0">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
}

