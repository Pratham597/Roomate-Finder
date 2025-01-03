import Matching from "../Models/Matching.js";

const setMatching = async (req, res) => {
    const user=req.user;

    if(!user) throw new Error("User not found!");
    const {sleepingTime,smoking,nightLife,dietaryPreferences,hobbies,state,games}=req.body;

    if(!sleepingTime||!smoking||!nightLife||!dietaryPreferences||!hobbies||!state||!games|| hobbies.length==0 || games.length==0 || dietaryPreferences.length==0){
        throw new Error("Details not found");
    }
    const userPref=await Matching.findOne({user:user._id});
    
    if(!userPref){
        const newUserPref=new Matching(req.body);
        newUserPref.user=user._id;
        await newUserPref.save();
        return res.status(200).json({message:"Preference added successfully!"})
    }
    else{
        await Matching.findOneAndUpdate({user:user._id},req.body);
        return res.status(200).json({message:"Preference updated succesfully!"});
    }
};

const calculateSimilarity = (userA, userB) => {
  let score = 0;


  // Weights for each field
  const weights = {
    sleepingTime: 3,
    smoking: 4,
    nightLife: 2,
    dietaryPreferences: 3,
    hobbies: 2,
    state: 5,
    games: 2,
  };

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }


  // Compare sleeping time (closer times = higher score)
  if (userA.sleepingTime && userB.sleepingTime) {
    const timeDiff = Math.abs(
        timeToMinutes(userA.sleepingTime) - timeToMinutes(userB.sleepingTime)
    );

    score +=
        weights.sleepingTime -
        Math.min(timeDiff / 60, weights.sleepingTime);
}
  

  // Match smoking preference
  if (userA.smoking === userB.smoking) score += weights.smoking;

  // Match nightlife preference
  if (userA.nightLife === userB.nightLife) score += weights.nightLife;

  // Match dietary preferences
  const sharedDietary = userA.dietaryPreferences.filter((preference) =>
    userB.dietaryPreferences.includes(preference)
  ).length;
  score +=
    (sharedDietary / Math.max(userA.dietaryPreferences.length, 1)) *
    weights.dietaryPreferences;

  // Match hobbies
  const sharedHobbies = userA.hobbies.filter((hobby) =>
    userB.hobbies.includes(hobby)
  ).length;
  score +=
    (sharedHobbies / Math.max(userA.hobbies.length, 1)) * weights.hobbies;

  // Match state
  if (userA.state === userB.state) score += weights.state;

  // Match games
  const sharedGames = userA.games.filter((game) =>
    userB.games.includes(game)
  ).length;
  score += (sharedGames / Math.max(userA.games.length, 1)) * weights.games;

  return score;
};

// Function which return all matches.
const allMatching = async (req, res) => {
  const logUser = req.user;
  if (!logUser) throw new Error("User not found!");

  const prefLogUser = await Matching.findOne({ user: logUser._id})
  if (!prefLogUser) throw new Error("Preferences not found!");

  const allUsers = await Matching.find({ user: { $ne: logUser._id } }).populate(
    "user",
    "email gender"
  );
  let matches=allUsers.filter((user)=> user.user.gender===logUser.gender);
  matches = matches.map((user) => {
    const score = calculateSimilarity(prefLogUser, user);
    return { user, score };
  });
  matches.sort((a, b) => b.score - a.score);
  
  
  if (matches.length < 10) return res.json(matches);
  else return res.json(matches.slice(0, 10));
};

export { setMatching, allMatching };
