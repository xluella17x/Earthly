import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"

const stats = {
  co2SavedInKg: 40,
  waterSavedInL: 250,
  electricitySavedInkWh: 20,
  landfillSavedInKg: 132,
  moneySavedInPennies: 2472,
}

const PostcodeImpactStats = () => {
  return (
    <SecondaryCardWrapper className="text-left flex flex-col gap-3">
      <h3 className="font-bold text-2xl text-center mb-3">Postcode Impact Stats</h3>
      <ul className="space-y-1.5 pl-6">
        <li>
          <p>
            CO2 saved: <span>{stats.co2SavedInKg} kg</span>
          </p>
        </li>
        <li>
          <p>
            Water saved: <span>{stats.waterSavedInL} L</span>
          </p>
        </li>
        <li>
          <p>
            Electricity saved: <span>{stats.electricitySavedInkWh} kWh</span>
          </p>
        </li>
        <li>
          <p>
            Landfill saved: <span>{stats.landfillSavedInKg} kg</span>
          </p>
        </li>
        <li>
          <p>
            Money saved:{" "}
            <span>£{(stats.moneySavedInPennies / 100).toFixed(2)}</span>
          </p>
        </li>
      </ul>
    </SecondaryCardWrapper>
  )
}

export default PostcodeImpactStats
