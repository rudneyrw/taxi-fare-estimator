import { useState } from "react";

const FARE_TABLE = [
  { from: "Airport", to: "Marriott", fare: 37 },
  { from: "Marriott", to: "Airport", fare: 37 },
  { from: "Seroe Pita", to: "Palm Beach", fare: 35 },
  { from: "Palm Beach", to: "Seroe Pita", fare: 35 }
];

const LOCATIONS = Array.from(new Set([
  ...FARE_TABLE.map((entry) => entry.from),
  ...FARE_TABLE.map((entry) => entry.to),
])).sort();

export default function TaxiFareCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [fare, setFare] = useState(null);

  const calculateFare = () => {
    const fareEntry = FARE_TABLE.find((row) => row.from === from && row.to === to);
    let base = fareEntry ? fareEntry.fare : 0;
    if (base < 10) base = 10;

    let total = base;
    if (passengers > 5) total *= 1.5;
    if (isNight) total += 5;
    if (luggage > passengers) total += (luggage - passengers) * 3;
    if (total < 10) total = 10;
    setFare(total.toFixed(2));
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Taxi Fare Estimator</h2>
      <label>From:
        <select value={from} onChange={e => setFrom(e.target.value)}>
          <option value="">Select</option>
          {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </label>
      <br />
      <label>To:
        <select value={to} onChange={e => setTo(e.target.value)}>
          <option value="">Select</option>
          {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </label>
      <br />
      <label>Passengers:
        <input type="number" value={passengers} onChange={e => setPassengers(Number(e.target.value))} min={1} max={7} />
      </label>
      <br />
      <label>Luggage:
        <input type="number" value={luggage} onChange={e => setLuggage(Number(e.target.value))} min={0} />
      </label>
      <br />
      <label>
        <input type="checkbox" checked={isNight} onChange={e => setIsNight(e.target.checked)} />
        Night/Holiday (10PM-8AM or Sunday/Holiday)
      </label>
      <br />
      <button onClick={calculateFare}>Calculate</button>
      {fare && <div><strong>Estimated Fare: ${fare} USD</strong></div>}
    </div>
  );
}