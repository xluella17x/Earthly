import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"

const stats = {
  co2SavedInKg: 40,
  waterSavedInL: 250,
  electricitySavedInkWh: 20,
  landfillSavedInKg: 132,
  moneySavedInPennies: 2472,
}

// figure out which stat is the biggest imagineable impact

// Your community has saved enough X this week to Y for Z
// e.g. X = electricity
// e.g. Y = power Buckingham palace
// e.g. Z = three days
const sentences = {
  // if the only info we are given is electricitySavedInkWh e.g. 20 kWh, how should we generate the sentence?
  electricity: (
    <p>
      Your community has saved enough{" "}
      <span className="font-bold">electricity</span> this week to{" "}
      <span className="font-bold">power Buckingham Palace</span> for{" "}
      <span className="font-bold">three days</span>.
    </p>
  ),
}

const PostcodeImpactSentence = () => {
  return <SecondaryCardWrapper>{sentences.electricity}</SecondaryCardWrapper>
}

export default PostcodeImpactSentence
