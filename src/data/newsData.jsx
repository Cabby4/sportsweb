const newsData = [
  {
    id: 1,
    category: "Premier League",
    title: "Chelsea Continue Preparations Ahead of Another Big Premier League Test",
    image:
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "02 Oct 2026",
    content: [
      "Chelsea are continuing their preparations as they look ahead to another important Premier League fixture.",
      "The team has been working on tactical organisation, attacking movement and defensive structure ahead of the upcoming match.",
      "With the Premier League season continuing to produce competitive matches, every fixture presents another opportunity for teams to build momentum.",
      "Supporters will be watching closely as Chelsea prepare to return to action and look for another strong performance."
    ]
  },

  {
    id: 2,
    category: "Transfer News",
    title: "Transfer Window Stories Continue To Dominate Football Headlines",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "01 Oct 2026",
    content: [
      "Transfer stories continue to generate significant interest among football supporters around the world.",
      "Clubs are constantly monitoring the market as they look for opportunities to improve their squads.",
      "Players, managers and supporters all remain interested in the latest developments as clubs plan for upcoming competitions.",
      "Cabby Sports will continue to follow transfer stories and provide updates as information becomes available."
    ]
  },

  {
    id: 3,
    category: "Champions League",
    title: "European Football Takes Centre Stage As Clubs Prepare For Major Fixtures",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "30 Sep 2026",
    content: [
      "European football continues to attract attention as clubs prepare for another round of major fixtures.",
      "The Champions League provides some of the biggest stages in club football, with teams competing for valuable points and qualification positions.",
      "Tactical decisions, squad depth and individual performances can all have an important impact on the outcome of matches.",
      "Football fans around the world will once again have plenty to follow as the competition continues."
    ]
  },

  {
    id: 4,
    category: "Football",
    title: "Young Players Continue To Make Their Mark In Modern Football",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "29 Sep 2026",
    content: [
      "Young footballers continue to receive opportunities at the highest levels of the game.",
      "Clubs are increasingly investing in youth development and giving talented players opportunities to compete alongside experienced professionals.",
      "For young players, consistency, discipline and development remain important as they establish themselves in senior football.",
      "The next generation of football stars will continue to be one of the most interesting stories to follow."
    ]
  },

  {
    id: 5,
    category: "Premier League",
    title: "Premier League Clubs Prepare For Another Competitive Weekend",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "28 Sep 2026",
    content: [
      "Premier League clubs are preparing for another weekend of competitive football.",
      "With points becoming increasingly important throughout the season, teams will be looking to produce strong performances.",
      "Managers are expected to carefully consider their line-ups and tactical approaches before kick-off.",
      "Fans can expect another weekend filled with football action and important storylines."
    ]
  },

  {
    id: 6,
    category: "International",
    title: "International Football Continues To Produce Exciting Stories",
    image:
      "https://images.unsplash.com/photo-1552318965-6e6f3c7f4e8e?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "27 Sep 2026",
    content: [
      "International football remains an important part of the global football calendar.",
      "National teams continue to develop their squads while preparing for major competitions.",
      "Players representing their countries have the opportunity to perform on a different stage and experience different tactical systems.",
      "The international game continues to connect football supporters across different countries and continents."
    ]
  },

  {
    id: 7,
    category: "Manager News",
    title: "Managers Face Important Tactical Decisions Ahead Of Upcoming Matches",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "26 Sep 2026",
    content: [
      "Football managers face several important decisions whenever their teams prepare for competitive matches.",
      "Formation, player selection and tactical instructions can all influence how a team performs.",
      "The ability to adapt during matches has also become increasingly important in modern football.",
      "Supporters will be watching to see how managers approach their upcoming fixtures."
    ]
  },

  {
    id: 8,
    category: "Match Preview",
    title: "Big Match Preview: What Could Decide The Next Premier League Encounter?",
    image:
      "https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "25 Sep 2026",
    content: [
      "Another exciting Premier League encounter is approaching, with both teams looking to secure an important result.",
      "Recent form, midfield control and attacking efficiency could all play important roles during the match.",
      "Set pieces and defensive organisation may also prove decisive when the two teams meet.",
      "Football supporters will be looking forward to seeing which side can execute its game plan more effectively."
    ]
  },

  {
    id: 9,
    category: "Transfers",
    title: "Clubs Continue To Monitor Players As Transfer Plans Take Shape",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "24 Sep 2026",
    content: [
      "Football clubs continue to monitor potential targets as they plan for future squad changes.",
      "Recruitment departments regularly evaluate players based on their performances, positions and long-term potential.",
      "Transfer planning often begins well before an official transfer window opens.",
      "Supporters can expect plenty of speculation and discussion as clubs assess their options."
    ]
  },

  {
    id: 10,
    category: "Football",
    title: "The Evolution Of Football Continues To Change The Modern Game",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "23 Sep 2026",
    content: [
      "Football continues to evolve as managers and clubs explore new tactical approaches.",
      "Technology, analytics and player development have all contributed to changes in the modern game.",
      "Teams are constantly searching for new ways to improve their performances and gain an advantage.",
      "The continued evolution of football makes the sport increasingly interesting for supporters around the world."
    ]
  },

  {
    id: 11,
    category: "Premier League",
    title: "Squad Depth Could Become Important As The Season Continues",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "22 Sep 2026",
    content: [
      "Squad depth can become particularly important as clubs face busy schedules throughout a football season.",
      "Managers may need to rotate their players while maintaining competitive performances across different competitions.",
      "Having quality options available from the bench can provide teams with greater flexibility.",
      "The ability to manage a squad effectively could become an important factor as the season progresses."
    ]
  },

  {
    id: 12,
    category: "Football",
    title: "Football Fans Prepare For Another Weekend Of Action",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=85",
    author: "Cabby Sports",
    date: "21 Sep 2026",
    content: [
      "Football supporters are preparing for another weekend filled with matches and stories from across the game.",
      "From domestic leagues to European competitions, there will be plenty for fans to follow.",
      "Supporters will be keeping an eye on team news, player performances and important results.",
      "Cabby Sports will continue bringing football stories together in one place."
    ]
  }
];

export default newsData;