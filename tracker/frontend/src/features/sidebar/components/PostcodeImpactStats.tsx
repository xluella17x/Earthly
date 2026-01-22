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
    <SecondaryCardWrapper>
      <h3 className="font-bold text-2xl">Postcode Impact Stats</h3>
      <li>
        <ul>
          <p>
            CO2 saved: <span>{stats.co2SavedInKg} kg</span>
          </p>
        </ul>
        <ul>
          <p>
            Water saved: <span>{stats.waterSavedInL} L</span>
          </p>
        </ul>
        <ul>
          <p>
            Electricity saved: <span>{stats.electricitySavedInkWh} kWh</span>
          </p>
        </ul>
        <ul>
          <p>
            Landfill saved: <span>{stats.landfillSavedInKg} kg</span>
          </p>
        </ul>
        <ul>
          <p>
            Money saved:
            <span>£{(stats.moneySavedInPennies / 100).toFixed(2)}</span>
          </p>
        </ul>
      </li>
    </SecondaryCardWrapper>
  )
}

export default PostcodeImpactStats
