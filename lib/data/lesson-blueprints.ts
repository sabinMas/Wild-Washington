import { type LearningAudience, type LessonPage } from "@/types/species";

type AudienceLessonBlueprint = Pick<
  LessonPage,
  "summary" | "essentialQuestion" | "discussionPrompts" | "assessment"
>;

type SpeciesLessonBlueprint = {
  materials: string[];
  vocabulary: string[];
  visualStudy: string[];
  walkthrough: LessonPage["walkthrough"];
  visualCaption: string;
  audiences: Record<LearningAudience, AudienceLessonBlueprint>;
};

export const lessonBlueprints: Record<string, SpeciesLessonBlueprint> = {
  "pacific-salmon": {
    materials: [
      "Species photo",
      "Observed Chinook spawner chart",
      "Washington range map",
      "Notebook or watershed sketch sheet",
    ],
    vocabulary: ["watershed", "estuary", "spawn", "redd", "barrier"],
    visualStudy: [
      "Use the photo to identify body shape, water conditions, and migration clues.",
      "Use the chart to track strong and weak return years rather than assuming a smooth trend.",
      "Use the map to connect mountain streams, estuaries, and migration routes.",
    ],
    walkthrough: [
      {
        title: "1. Hook learners with the migration story",
        detail:
          "Start with the fact that salmon hatch in freshwater, grow in the ocean, and return to the stream where they began. Have learners trace that journey on a quick sketch before naming Washington habitats in the map.",
      },
      {
        title: "2. Build the watershed picture",
        detail:
          "Introduce Puget Sound tributaries, Olympic Peninsula streams, and lower Columbia tributaries as connected habitat, not isolated places. Emphasize that salmon need cool water, gravel beds, floodplains, and passage around barriers.",
      },
      {
        title: "3. Read the recovery indicator",
        detail:
          "Interpret the chart as annual Puget Sound Chinook natural spawner counts. Ask learners to find a strong return year, a weak return year, and one possible reason the line bounces instead of moving steadily.",
      },
      {
        title: "4. Connect science to action",
        detail:
          "Compare habitat fragmentation, warm water, and shifting ocean conditions with the recovery actions already underway: fish-passage projects, floodplain restoration, and riparian planting. End by asking which action helps salmon at the largest scale.",
      },
    ],
    visualCaption:
      "Lead with the salmon image for observation, then move to the spawner chart and Washington river map.",
    audiences: {
      elementary: {
        summary:
          "Learners follow salmon from river to ocean and back, then connect the journey to safe habitat in Washington.",
        essentialQuestion:
          "What does a salmon need to make it all the way home?",
        discussionPrompts: [
          "Which part of the salmon journey seems hardest?",
          "How could a blocked stream crossing change the story?",
          "Why do forests and streams matter to fish that also live in the ocean?",
        ],
        assessment:
          "Students create a labeled life-cycle path showing one danger salmon face and one habitat feature that helps them.",
      },
      middle: {
        summary:
          "Students use salmon to study how watersheds, ocean conditions, and human infrastructure shape a species over time.",
        essentialQuestion:
          "Why can salmon recovery improve in one year and drop in another?",
        discussionPrompts: [
          "Which habitat stage is easiest for people to improve locally?",
          "Why is it useful to compare multiple years instead of only the latest value?",
          "How do rivers, estuaries, and ocean food webs connect in this lesson?",
        ],
        assessment:
          "Students annotate the chart with at least two likely stressors and one restoration action that could improve future returns.",
      },
      high: {
        summary:
          "Students analyze Chinook spawner data as a policy-relevant recovery indicator and evaluate how habitat, marine survival, and infrastructure interact.",
        essentialQuestion:
          "What does this Chinook indicator measure well, and what does it leave out?",
        discussionPrompts: [
          "Why is an indicator series useful even when it does not represent every salmon stock?",
          "How should managers balance habitat restoration with climate resilience planning?",
          "What evidence would strengthen a claim that salmon are recovering?",
        ],
        assessment:
          "Students write a short evidence claim about whether the current salmon picture suggests recovery, volatility, or ongoing risk.",
      },
      educators: {
        summary:
          "This lesson anchors a place-based sequence linking geography, food webs, treaty rights, and restoration planning.",
        essentialQuestion:
          "How can salmon connect ecology, civics, and local stewardship in one lesson arc?",
        discussionPrompts: [
          "Which local watershed could students investigate alongside this dashboard?",
          "How can this lesson move from graph reading into field observation?",
          "Where can treaty rights or restoration planning deepen the discussion?",
        ],
        assessment:
          "Learners produce a watershed action brief or field notebook entry that links salmon evidence to a local restoration priority.",
      },
    },
  },
  "southern-resident-orca": {
    materials: [
      "Species photo",
      "Observed census chart",
      "Washington range map",
      "Soundscape or vessel-noise prompt sheet",
    ],
    vocabulary: ["pod", "echolocation", "census", "prey", "contaminant"],
    visualStudy: [
      "Use the image to talk about body shape, dorsal fin, and pod identity.",
      "Use the census chart to show how small populations can change quickly from a few births or deaths.",
      "Use the map to connect Salish Sea travel routes with vessel traffic and salmon pathways.",
    ],
    walkthrough: [
      {
        title: "1. Begin with family structure",
        detail:
          "Introduce J, K, and L pods as connected family groups with recognizable calls and individuals. Ask learners why a family-based population might be especially vulnerable when the total count is small.",
      },
      {
        title: "2. Trace the prey connection",
        detail:
          "Link the whales to Chinook salmon rather than treating them as an isolated marine story. Use the map to show why inland rivers and ocean travel corridors both matter to these whales.",
      },
      {
        title: "3. Read the count as a census",
        detail:
          "Explain that this graph is a direct census, not a proxy. Have learners compare the peak in 1995 with the more recent totals and discuss what the small rebound to 74 whales does and does not mean.",
      },
      {
        title: "4. Weigh recovery choices",
        detail:
          "Compare prey shortage, vessel noise, and contaminants with current recovery actions such as buffer rules, quieter boating, and salmon recovery. Close by asking which action gives the broadest benefit across the whole food web.",
      },
    ],
    visualCaption:
      "Use the orca image to launch observation, then the census chart to show how every whale matters in a small population.",
    audiences: {
      elementary: {
        summary:
          "Learners study orca families, sound, and salmon to understand why whales need food and quiet water.",
        essentialQuestion:
          "What helps an orca family stay safe and find enough food?",
        discussionPrompts: [
          "Why might loud boats make life harder for whales?",
          "How are salmon and orcas connected?",
          "Why does every whale matter when the group is small?",
        ],
        assessment:
          "Students create a simple cause-and-effect diagram linking quiet water, salmon, and healthy orca families.",
      },
      middle: {
        summary:
          "Students connect underwater sound, prey supply, and direct census data to explain why orca recovery remains difficult.",
        essentialQuestion:
          "Why is it hard for a small whale population to recover once it starts to decline?",
        discussionPrompts: [
          "Which stressor seems easiest for people to reduce quickly?",
          "What does the census chart show that a general wildlife story would miss?",
          "How do river choices affect marine mammals?",
        ],
        assessment:
          "Students annotate the orca graph with three human or ecosystem factors that influence the line.",
      },
      high: {
        summary:
          "Students examine direct census data, demographic vulnerability, and cross-border policy choices affecting Southern Resident recovery.",
        essentialQuestion:
          "Which recovery lever matters most when a population is both small and culturally important?",
        discussionPrompts: [
          "What is the value of census data compared with modeled abundance?",
          "How should decision-makers prioritize prey, noise, and contaminant actions?",
          "What makes this a regional rather than purely local conservation problem?",
        ],
        assessment:
          "Students write a recommendation memo arguing for the highest-leverage recovery action using the census chart and supporting evidence.",
      },
      educators: {
        summary:
          "This lesson works as a systems case study linking marine ecology, salmon policy, transportation, and public identity in the Salish Sea.",
        essentialQuestion:
          "How can one species help students think across ecosystems and public decisions?",
        discussionPrompts: [
          "Where can students compare this page with the salmon dashboard?",
          "How might a civics component strengthen the science lesson?",
          "What local shoreline or maritime context can make the lesson concrete?",
        ],
        assessment:
          "Learners synthesize a systems map or policy brief connecting whales, salmon, vessel traffic, and toxics reduction.",
      },
    },
  },
  "northern-spotted-owl": {
    materials: [
      "Species photo",
      "Territory estimate chart",
      "Washington forest range map",
      "Forest structure comparison notes",
    ],
    vocabulary: ["territory", "old growth", "canopy", "proxy", "competition"],
    visualStudy: [
      "Use the image to notice plumage, eye placement, and camouflage.",
      "Use the chart to explain why territory estimates are a proxy rather than a direct owl count.",
      "Use the map to compare Olympic, Cascade, and southwest forest landscapes.",
    ],
    walkthrough: [
      {
        title: "1. Frame the owl as a forest indicator",
        detail:
          "Introduce the northern spotted owl as a species tied to complex mature forests. Ask learners what an owl might need from a forest beyond just trees.",
      },
      {
        title: "2. Compare habitat quality",
        detail:
          "Use the habitat list to separate layered older forests from simplified stands. Emphasize nesting structure, prey habitat, and connected canopy.",
      },
      {
        title: "3. Read the proxy carefully",
        detail:
          "Explain that the chart estimates occupied territories because Washington has never had a full statewide census. Learners should interpret the line as a recovery indicator, not as a count of every individual owl.",
      },
      {
        title: "4. Add the management dilemma",
        detail:
          "Discuss barred owl competition alongside forest protection and wildfire resilience. Ask learners why habitat protection alone may not solve the whole problem.",
      },
    ],
    visualCaption:
      "Move from the owl image to the occupied-territory chart so learners see why a proxy metric still matters.",
    audiences: {
      elementary: {
        summary:
          "Learners discover why one quiet forest owl depends on big old trees and safe nesting space.",
        essentialQuestion:
          "What kind of forest home does a spotted owl need?",
        discussionPrompts: [
          "Why might an owl want a forest with many layers?",
          "What would make a forest feel safe or unsafe?",
          "Why is it helpful to know where owl territories still remain?",
        ],
        assessment:
          "Students draw an owl-friendly forest and label three habitat features the species needs.",
      },
      middle: {
        summary:
          "Students compare habitat quality and species competition to explain why the owl keeps declining.",
        essentialQuestion:
          "Why is protecting a forest not always enough to protect the owl?",
        discussionPrompts: [
          "How does barred owl competition change the recovery story?",
          "Why do territory estimates still give useful evidence?",
          "What forest feature seems most important in this lesson?",
        ],
        assessment:
          "Students explain the decline using one habitat factor and one competition factor grounded in the dashboard evidence.",
      },
      high: {
        summary:
          "Students use the owl as a case study in indicator species, forest policy, and the limits of proxy monitoring.",
        essentialQuestion:
          "How should policymakers act when the best available metric is incomplete but still urgent?",
        discussionPrompts: [
          "What are the strengths and limits of territory occupancy as evidence?",
          "How do wildfire resilience and old-forest protection interact?",
          "What would count as meaningful recovery for the owl?",
        ],
        assessment:
          "Students write a short policy argument about how to prioritize habitat, competition management, and monitoring.",
      },
      educators: {
        summary:
          "This lesson supports interdisciplinary work on old-growth forests, environmental history, and evidence-based decision-making.",
        essentialQuestion:
          "How can the owl help students study both ecological complexity and land-use conflict?",
        discussionPrompts: [
          "Where could local forest observations strengthen this lesson?",
          "How might students compare the owl with another indicator species?",
          "What primary-source or policy documents could extend the lesson?",
        ],
        assessment:
          "Learners produce a forest management brief or habitat-evidence map that explains why proxy data still deserves action.",
      },
    },
  },
  "gray-wolf": {
    materials: [
      "Species photo",
      "Minimum wolf count chart",
      "Washington range map",
      "Coexistence case notes",
    ],
    vocabulary: ["pack", "corridor", "minimum count", "breeding pair", "coexistence"],
    visualStudy: [
      "Use the image to discuss pack behavior and body language.",
      "Use the chart to explain why minimum counts confirm presence but do not equal the full population.",
      "Use the map to compare northeast strongholds with newer expansion areas.",
    ],
    walkthrough: [
      {
        title: "1. Start with movement and packs",
        detail:
          "Introduce wolves as wide-ranging mammals that live in family packs and use connected landscapes. Ask learners why a roaming predator needs more than one protected patch.",
      },
      {
        title: "2. Map recovery unevenly",
        detail:
          "Use the range map to compare the northeast recovery area, the North Cascades, and south-central expansion zones. Emphasize that statewide recovery depends on distribution, not just total numbers.",
      },
      {
        title: "3. Read the line as a minimum count",
        detail:
          "Clarify that the chart shows confirmed year-end minimum wolves, not every wolf on the landscape. Have learners compare growth over time while keeping that monitoring limit in mind.",
      },
      {
        title: "4. Discuss coexistence choices",
        detail:
          "Connect livestock conflict, corridors, and public tolerance with range riders, monitoring, and outreach. End by asking what recovery should mean if wolves increase in one region but not another.",
      },
    ],
    visualCaption:
      "Use the wolf image for engagement, then pair the minimum-count chart with the map to show recovery is both numerical and geographic.",
    audiences: {
      elementary: {
        summary:
          "Learners explore wolf packs, movement, and safe travel routes across Washington.",
        essentialQuestion:
          "What does a wolf pack need to move safely across the land?",
        discussionPrompts: [
          "Why might roads or fences matter to a wolf?",
          "What is a pack, and why do family groups help wolves survive?",
          "Why is a map helpful when learning about wolves?",
        ],
        assessment:
          "Students design a simple wildlife corridor and explain how it helps a pack move safely.",
      },
      middle: {
        summary:
          "Students study wolf recovery as both an ecological and a social story grounded in minimum-count data.",
        essentialQuestion:
          "How can a species recover biologically while still causing conflict for people?",
        discussionPrompts: [
          "What does a minimum count tell us well?",
          "Why is coexistence part of the science story here?",
          "What should matter more: total wolves or where packs are established?",
        ],
        assessment:
          "Students compare two recovery measures and argue which one should carry more weight in Washington.",
      },
      high: {
        summary:
          "Students evaluate minimum-count data, regional recovery goals, and coexistence policy to judge whether wolf recovery is complete.",
        essentialQuestion:
          "What is the difference between population growth and full recovery?",
        discussionPrompts: [
          "How do minimum counts shape public understanding of success?",
          "Why are breeding pairs and regional distribution important?",
          "Which coexistence strategy seems most effective and why?",
        ],
        assessment:
          "Students write a recovery brief explaining whether the current data shows statewide recovery, partial recovery, or unresolved imbalance.",
      },
      educators: {
        summary:
          "This lesson supports issue-based inquiry where data literacy and civic dialogue matter as much as ecology.",
        essentialQuestion:
          "How can students use evidence to discuss a species that is both ecologically important and socially contested?",
        discussionPrompts: [
          "What classroom roles could help students examine multiple perspectives?",
          "How can map literacy deepen the recovery conversation?",
          "What would make this lesson locally relevant without oversimplifying the issue?",
        ],
        assessment:
          "Learners develop an evidence-based coexistence proposal or stakeholder memo grounded in the chart and map.",
      },
    },
  },
  "northern-leopard-frog": {
    materials: [
      "Species photo",
      "Occupied management-unit chart",
      "Wetland range map",
      "Wetland habitat observation sheet",
    ],
    vocabulary: ["wetland", "tadpole", "reintroduction", "occupancy", "hydrology"],
    visualStudy: [
      "Use the image to notice camouflage and body shape suited for marsh habitat.",
      "Use the chart to clarify that the numbers represent occupied management units, not individual frogs.",
      "Use the map to identify how connected wetlands support dispersal and breeding.",
    ],
    walkthrough: [
      {
        title: "1. Introduce the frog as a wetland specialist",
        detail:
          "Launch with the species photo and ask what clues suggest this frog belongs in marshes and ponds. Then connect those clues to breeding, hiding, and feeding in shallow wetland habitat.",
      },
      {
        title: "2. Build the habitat story",
        detail:
          "Use the range map to focus on the Potholes Reservoir region, marshes, and pond networks. Emphasize that wetland recovery depends on water timing, shoreline cover, and connected habitat patches.",
      },
      {
        title: "3. Read the metric precisely",
        detail:
          "Explain that the chart shows occupied management units. Ask learners why managers might track occupied wetland units when counting every frog would be difficult and misleading.",
      },
      {
        title: "4. Follow the recovery strategy",
        detail:
          "Connect wetland loss, disease, and predators with captive rearing, reintroduction, and habitat management. End by asking what kind of evidence would show that reintroduction is truly working.",
      },
    ],
    visualCaption:
      "Use the frog image and wetland map to build habitat understanding before reading the occupied-unit chart.",
    audiences: {
      elementary: {
        summary:
          "Learners use a marsh-dwelling frog to understand why clean water and safe shoreline cover matter.",
        essentialQuestion:
          "What makes a wetland a good home for a frog?",
        discussionPrompts: [
          "Why do frogs need both water and land nearby?",
          "What could happen if a pond dries too early?",
          "Why is hiding important for a small animal?",
        ],
        assessment:
          "Students label a frog-friendly wetland with three features that help eggs, tadpoles, or adult frogs survive.",
      },
      middle: {
        summary:
          "Students study wetlands as recovery spaces and learn why occupied units are a more honest metric than pretending we know every frog.",
        essentialQuestion:
          "Why would scientists track occupied wetland units instead of counting every frog?",
        discussionPrompts: [
          "What does occupancy tell us about habitat?",
          "Why are wetlands sensitive to water-management changes?",
          "How do reintroduction and habitat quality work together?",
        ],
        assessment:
          "Students explain the chart in plain language and state clearly what the numbers do and do not represent.",
      },
      high: {
        summary:
          "Students use the frog as a reintroduction case study that highlights monitoring uncertainty and habitat dependence.",
        essentialQuestion:
          "What evidence would convince you that this frog is moving toward long-term recovery?",
        discussionPrompts: [
          "What are the strengths and limits of occupancy as a recovery indicator?",
          "How can hydrology shape amphibian survival even with active management?",
          "What additional data would improve confidence in the trend?",
        ],
        assessment:
          "Students propose a monitoring plan that combines occupancy, breeding evidence, and habitat observations.",
      },
      educators: {
        summary:
          "This lesson provides a strong wetland-recovery example for classes studying restoration, uncertainty, and adaptive management.",
        essentialQuestion:
          "How can this species help students understand that restoration is both hopeful and evidence-dependent?",
        discussionPrompts: [
          "Which local wetland investigation could pair with this lesson?",
          "How might students compare occupancy data with more direct counts in other species?",
          "What restoration theme would make the lesson interdisciplinary?",
        ],
        assessment:
          "Learners build a wetland restoration notebook or adaptive-management plan using the chart, map, and habitat evidence.",
      },
    },
  },
  "columbia-basin-pygmy-rabbit": {
    materials: [
      "Species photo",
      "Minimum wild population chart",
      "Shrub-steppe range map",
      "Habitat scorecard template",
    ],
    vocabulary: ["sagebrush", "burrow", "reintroduction", "minimum estimate", "shrub-steppe"],
    visualStudy: [
      "Use the image to spot camouflage, burrow dependence, and small-body vulnerability.",
      "Use the chart to discuss collapse, zero-wild reset, and slow recovery in the wild population estimate.",
      "Use the map to show how narrow the species' Washington range really is.",
    ],
    walkthrough: [
      {
        title: "1. Begin with the habitat specialist",
        detail:
          "Introduce the pygmy rabbit as a rabbit that digs its own burrows and depends on dense sagebrush. Ask learners why a species with such narrow habitat needs can decline quickly when the landscape changes.",
      },
      {
        title: "2. Explore shrub-steppe context",
        detail:
          "Use the range map to anchor Moses Coulee, Beezley Hills, and release sites. Emphasize deep soils, shrub cover, and protection from predators as nonnegotiable habitat features.",
      },
      {
        title: "3. Read the recovery arc honestly",
        detail:
          "Walk through the chart from historical decline to the period with no known wild population and then to the current minimum wild estimate. Clarify that the recent value is a minimum estimate, not a full count.",
      },
      {
        title: "4. Evaluate what recovery requires",
        detail:
          "Connect wildfire, invasive plants, and small population size with captive breeding, release work, and habitat restoration. End by asking whether a species can be called secure if its range remains this small.",
      },
    ],
    visualCaption:
      "Use the rabbit image to discuss camouflage and burrows, then the chart to show how fragile recovery can be after near-extirpation.",
    audiences: {
      elementary: {
        summary:
          "Learners discover how a tiny rabbit depends on sagebrush, loose soil, and safe hiding places.",
        essentialQuestion:
          "What does a tiny rabbit need to stay safe in a dry place?",
        discussionPrompts: [
          "Why does this rabbit need both shrubs and burrows?",
          "How could a fire change the rabbit's home?",
          "Why might a small animal need many hiding places?",
        ],
        assessment:
          "Students build or draw a simple shrub-steppe habitat showing where the rabbit would hide, dig, and travel.",
      },
      middle: {
        summary:
          "Students use the pygmy rabbit to learn how a species can disappear from the wild and slowly return through reintroduction.",
        essentialQuestion:
          "Why is it hard to recover a species after the wild population nearly disappears?",
        discussionPrompts: [
          "Why is a minimum estimate different from a full population count?",
          "What makes shrub-steppe restoration different from forest or wetland restoration?",
          "Why does a narrow range increase risk?",
        ],
        assessment:
          "Students complete a habitat scorecard and explain whether a release site looks suitable for rabbit recovery.",
      },
      high: {
        summary:
          "Students examine near-extirpation, captive breeding, and uncertainty in the minimum wild estimate to judge the strength of recovery.",
        essentialQuestion:
          "What evidence would show that pygmy rabbit recovery is becoming self-sustaining rather than temporary?",
        discussionPrompts: [
          "How should managers interpret a minimum estimate with wide uncertainty?",
          "What role does habitat quality play after captive breeding succeeds?",
          "Which risk remains greatest even after numbers improve?",
        ],
        assessment:
          "Students write a recovery assessment arguing whether current evidence suggests early success, fragile progress, or unresolved danger.",
      },
      educators: {
        summary:
          "This lesson broadens attention beyond forests and coasts by centering dryland conservation and recovery from near-extirpation.",
        essentialQuestion:
          "How can this species help students understand both biological recovery and landscape vulnerability?",
        discussionPrompts: [
          "What dryland concepts are often missing from Washington wildlife lessons?",
          "How might students compare this recovery story with the leopard frog or sage-grouse?",
          "What local land-use or wildfire themes could strengthen the lesson?",
        ],
        assessment:
          "Learners create a release-site recommendation or dryland recovery brief grounded in habitat evidence and uncertainty.",
      },
    },
  },
  "marbled-murrelet": {
    materials: [
      "Species photo",
      "Modeled abundance chart",
      "Forest-and-ocean range map",
      "Two-habitat concept map sheet",
    ],
    vocabulary: ["abundance", "old growth", "nearshore", "predation", "coupled ecosystems"],
    visualStudy: [
      "Use the image to introduce the surprising idea of a seabird that nests in trees.",
      "Use the chart to explain modeled abundance and why direct annual counts are difficult.",
      "Use the map to trace the connection between coastal marine waters and inland nesting forests.",
    ],
    walkthrough: [
      {
        title: "1. Start with the surprise",
        detail:
          "Ask learners what they expect from a seabird, then reveal that marbled murrelets feed at sea but nest high in old trees. Use that surprise to frame the species as a two-habitat story.",
      },
      {
        title: "2. Connect forest and ocean",
        detail:
          "Use the map to move between feeding waters off the coast and nesting forests on the Olympic Peninsula and southwest Washington. Emphasize that losing either side of this system affects the same species.",
      },
      {
        title: "3. Read modeled abundance",
        detail:
          "Explain that murrelet abundance is estimated through status-review modeling rather than a direct census. Ask learners what the decline from 2015 to 2023 suggests without overstating precision.",
      },
      {
        title: "4. Evaluate linked threats",
        detail:
          "Discuss nesting habitat loss, marine disturbance, and nest predation together. End by asking why single-cause explanations often fail for species living across two connected ecosystems.",
      },
    ],
    visualCaption:
      "Use the murrelet image to surface surprise, then read the modeled abundance chart alongside the forest-ocean map.",
    audiences: {
      elementary: {
        summary:
          "Learners meet a seabird that needs both the ocean and big forest trees.",
        essentialQuestion:
          "How can one bird need two very different homes?",
        discussionPrompts: [
          "What does the bird do in the ocean?",
          "Why would a tree matter to a seabird?",
          "What could happen if one of its homes changes?",
        ],
        assessment:
          "Students draw the murrelet's two homes and label what the bird gets from each one.",
      },
      middle: {
        summary:
          "Students use the murrelet to study how forest habitat and marine conditions work together.",
        essentialQuestion:
          "Why is this bird harder to protect than a species that uses only one habitat?",
        discussionPrompts: [
          "What does modeled abundance help us see?",
          "Why do campground food scraps matter to a forest nest?",
          "How do ocean prey and nesting habitat interact?",
        ],
        assessment:
          "Students build a concept map showing at least three ways ocean and forest systems connect for murrelets.",
      },
      high: {
        summary:
          "Students analyze a cross-ecosystem conservation problem where modeled abundance, habitat limits, and marine conditions all matter.",
        essentialQuestion:
          "Why does the murrelet challenge simple explanations about wildlife decline?",
        discussionPrompts: [
          "What are the strengths and limits of modeled abundance?",
          "How should land and marine policy work together here?",
          "Which threat seems hardest to manage with certainty?",
        ],
        assessment:
          "Students write a short brief recommending one forest action and one marine action for murrelet recovery.",
      },
      educators: {
        summary:
          "This lesson is designed for integrated ecosystem teaching that bridges marine science, forests, and evidence-based reasoning.",
        essentialQuestion:
          "How can the murrelet help students think across ecosystem boundaries instead of inside one habitat box?",
        discussionPrompts: [
          "Which comparison lesson would deepen this page: salmon, owl, or sage-grouse?",
          "How might students investigate coupled systems with limited class time?",
          "Where could a field observation or coastal case study fit best?",
        ],
        assessment:
          "Learners create an integrated systems diagram or policy brief showing why forest and marine actions must be taught together.",
      },
    },
  },
  "greater-sage-grouse": {
    materials: [
      "Species photo",
      "Lek-based estimate chart",
      "Shrub-steppe range map",
      "Lek protection planning sheet",
    ],
    vocabulary: ["lek", "sagebrush", "disturbance", "estimate", "fragmentation"],
    visualStudy: [
      "Use the image to observe display features and talk about lek behavior.",
      "Use the chart to explain that the line comes from lek-based estimates, not a full census.",
      "Use the map to show how small and fragmented Washington's remaining sage-grouse range is.",
    ],
    walkthrough: [
      {
        title: "1. Open with the lek display",
        detail:
          "Introduce sage-grouse through their spring display behavior and ask why a species would gather in open spaces to court. Use that question to frame how sensitive breeding grounds are to disturbance.",
      },
      {
        title: "2. Build the shrub-steppe setting",
        detail:
          "Use the map to anchor central Washington sagebrush landscapes and explain how lek sites, nesting cover, and brood habitat need to stay connected.",
      },
      {
        title: "3. Read the lek-based estimate",
        detail:
          "Clarify that the chart tracks estimated birds derived from lek counts. Ask learners what the recent declines suggest about the health of the remaining shrub-steppe system.",
      },
      {
        title: "4. Prioritize recovery choices",
        detail:
          "Connect habitat fragmentation, invasive grasses, and disturbance near leks with restoration, disturbance limits, and fire planning. End by asking which action best protects the breeding core and the wider landscape.",
      },
    ],
    visualCaption:
      "Use the image to make lek behavior memorable, then interpret the lek-based estimate chart in the context of a shrinking sagebrush landscape.",
    audiences: {
      elementary: {
        summary:
          "Learners use the dancing sage-grouse to understand why big sagebrush landscapes matter.",
        essentialQuestion:
          "Why does a dancing bird need so much quiet sagebrush space?",
        discussionPrompts: [
          "What might scare birds away from a lek?",
          "Why does sagebrush matter for more than one season?",
          "What would make this place feel safe to a bird?",
        ],
        assessment:
          "Students create a simple lek protection poster showing what the birds need nearby.",
      },
      middle: {
        summary:
          "Students study how lek counts, fire, and habitat fragmentation reveal the condition of shrub-steppe ecosystems.",
        essentialQuestion:
          "Why can a species still be in trouble even when we can see and count some of its displays each spring?",
        discussionPrompts: [
          "What does a lek count measure well?",
          "How do roads, noise, or structures affect breeding behavior?",
          "Why do invasive grasses raise the risk for sage-grouse?",
        ],
        assessment:
          "Students identify the most urgent shrub-steppe threat and defend their choice with chart and map evidence.",
      },
      high: {
        summary:
          "Students use lek-based estimates to evaluate whether Washington's remnant sage-grouse population is stabilizing or still sliding toward greater risk.",
        essentialQuestion:
          "What does the sage-grouse line reveal about the condition of Washington's shrub-steppe?",
        discussionPrompts: [
          "Why are lek counts useful but incomplete?",
          "How does landscape fragmentation change what recovery should mean?",
          "Which management lever could protect both breeding and nesting habitat?",
        ],
        assessment:
          "Students write a management recommendation that prioritizes one landscape-scale action for sage-grouse recovery.",
      },
      educators: {
        summary:
          "This lesson helps classrooms foreground shrub-steppe ecology, lek behavior, and the challenge of conserving small remnant populations.",
        essentialQuestion:
          "How can this species anchor a stronger Washington dryland unit rather than a one-off wildlife story?",
        discussionPrompts: [
          "What comparison with pygmy rabbit would enrich the lesson?",
          "How can students connect behavior, habitat, and fire in one sequence?",
          "What local dryland observations or maps could extend the lesson?",
        ],
        assessment:
          "Learners produce a shrub-steppe conservation plan or visual explanation that connects lek behavior to landscape management.",
      },
    },
  },
};
