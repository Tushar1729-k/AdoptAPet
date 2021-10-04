// import React from 'react'
// import { Row, Col, Card, ListGroup } from 'react-bootstrap'
// import {useState, useEffect} from 'react'

// const teamContribution = [
//     {
// 		name: "Sohum Kapoor",
// 		username: "sohumk",
// 		email: "4sohum@gmail.com",
// 		picture_path: "",
// 		role: "",
// 		bio:
// 			"I’m a fourth year CS Major with a minor in Business Management. I was born in New Jersey and spend my freetime cooking, gaming, and watching football.",
// 		linkedin: "",
// 		commits: 0,
// 		issues: 0,
// 		tests: 0,
// 	},
// 	{
// 		name: "Sean Aujong",
// 		username: "",
// 		email: "seanaujong@gmail.com",
// 		picture_path: "",
// 		role: "",
// 		bio:
// 			"",
// 		linkedin: "",
// 		commits: 0,
// 		issues: 0,
// 		tests: 0,
// 	},
// 	{
// 		name: "Tushar Kohli",
// 		username: "",
// 		picture_path: "",
// 		email: "",
// 		role: "",
// 		bio:
// 			"I’m a third year CS major at UT Austin. I’m from Dallas, Texas and in my free time I enjoy exercising, cooking, reading, playing video games, and listening to podcasts!",
// 		linkedin: "https://www.linkedin.com/in/jefferson-ye",
// 		commits: 0,
// 		issues: 0,
// 		tests: 0,
// 	},
// 	{
// 		name: "Sydney Owen",
// 		username: "seowen99",
// 		picture_path: SydneyOwenImg,
// 		email: "seowen@utexas.edu",
// 		role: "Back-end",
// 		bio:
// 			"I’m a fourth year CS major at UT Austin. I grew up in a small town called Llano, Texas. I spend my free time reading sci-fi/fantasy novels, playing video games, and spoiling my cat.",
// 		linkedin: "https://www.linkedin.com/in/sydney-e-owen",
// 		commits: 0,
// 		issues: 0,
// 		tests: 0,
// 	},
// 	{
// 		name: "Ivan Romero",
// 		username: "ivanromero1000",
// 		picture_path: IvanRomeroImg,
// 		email: "ivanromero1000@gmail.com",
// 		role: "Back-end",
// 		bio:
// 			"I'm a fourth year CS major at UT Austin. I'm from Houston, Texas and I spend most of my time cooking or watching and participating in combat sports like boxing or Brazilian-Jiu-Jitsu.",
// 		linkedin: "https://www.linkedin.com/in/ivanrome100",
// 		commits: 0,
// 		issues: 0,
// 		tests: 0,
// 	},
// 	{
// 		name: "Kevin Li",
// 		username: "Catalystic",
// 		picture_path: KevinLiImg,
// 		email: "kevin.li1729@utexas.edu",
// 		role: "Back-end | Phase IV Leader",
// 		bio:
// 			"I’m a third year CS major at UT Austin. I’m from Austin, Texas and spend my free time playing chess and camping. I definitely have spent too much time playing Among Us lately.",
// 		linkedin: "https://www.linkedin.com/in/kevinli1729",
// 		commits: 0,
// 		issues: 0,
// 		tests: 0,
// 	}
// ]

// const fetchGitLabApiInfo = async () => {
//     let totalCommits = 0, totalIssues = 0, totalTests = 0

// 	// Zero out individual commits and issues so recorded commits & issues don't need to be recorded
//     teamContribution.forEach((member) => {
//         member.commits = 0
//         member.issues = 0
// 		totalTests += member.tests
//     })

// 	// Get commit information from GitLab API
//     fetch("https://gitlab.com/api/v4/projects/29831002/repository/contributors")
//         .then(
//             function(response) {
// 				// Check that response is OK
//                 if (response.status !== 200) {
//                     return "Error fetching GitLab API data: " + response.status
//                 }

// 				// Process JSON from response
// 				await response.json().then(function(userCommitList){
// 					userCommitList.forEach((user) => {
// 						// Map JSON fields we care about to variables
// 						const {name, email, commits} = user
// 						// Add commits to correct team member
// 						teamContribution.forEach((teamMember) => {
// 							if(teamMember.name === name || teamMember.username == name || teamMember.email === email)
// 								teamMember.commits += commits
// 						})
// 						totalCommits += commits
// 					})
// 				})
//             }
//         )
	
// 	// Get issue information from GitLab API
// 	fetch("https://gitlab.com/api/v4/projects/29831002/issues")
// 		.then(
// 			function(response) {
// 				// Check that response is OK
//                 if (response.status !== 200) {
//                     return "Error fetching GitLab API data: " + response.status
//                 }
				
// 				// Process JSON from response
// 				await response.json().then(function(issueList){
// 					issueList.forEach((issue) => {
// 						// Map JSON fields we care about to variables
// 						const { assignees } = issue
// 						assignees.forEach((assignee) => {
// 							const {name, username}= assignee
// 							// Add commits to correct team member
// 							teamContribution.forEach((teamMember) => {
// 								if(teamMember.name === name || teamMember.username == username)
// 									teamMember.issues += 1
// 							})
// 						})
// 						totalIssues += 1
// 					})
// 				})
// 			}
// 		)
	
// 	return {
// 		groupCommits: totalCommits,
// 		groupIssues: totalIssues,
// 		groupTests: totalTests,
// 		groupContribution: teamContribution
// 	}

// }

// const About = () => {
// 	const [groupMemberList, setgroupMemberList] = useState([])
// 	const [groupCommits, setGroupCommits] = useState(0)
// 	const [groupIssues, setGroupIssues] = useState(0)
// 	const [groupTests, setGroupTests] = useState(0)
// 	const [fetchedData, setFetchedData] = useState(false)

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			if (groupMemberList === undefined || groupMemberList.length === 0) {
// 				const gitlabApiInfo = await fetchGitLabApiInfo()
// 				setGroupCommits(gitlabApiInfo.groupCommits)
// 				setGroupIssues(gitlabApiInfo.groupIssues)
// 				setGroupTests(gitlabApiInfo.groupTests)
// 				setgroupMemberList(gitlabApiInfo.groupContribution)
// 				setFetchedData(true)
// 			}
// 		}
// 		fetchData()
// 	}, [groupMemberList])

// 	return (
// 		<div style={{padding: '4vw'}}>
// 			<h1>Gitlab Individual Data</h1>
// 			{fetchedData ? (
// 				<Row xs={1} md={2} className="g-4">
// 					{/* {groupMemberList.map((teamMember) => {
// 						const {name, bio, role, picture_path, commits, issues, tests, linkedin} = teamMember
// 						return (
// 							// <Col>
// 							// <Card>
// 							// 	<Card.Img variant="top" src={picture_path} style={{width: '100%', height: '400px'}} />
// 							// 	<Card.Body>
// 							// 	<Card.Title style={{fontSize: '4vh'}}>{name}</Card.Title>
// 							// 	<Card.Subtitle style={{fontSize: '2vh'}} className="mb-2 text-muted">{role}</Card.Subtitle>
// 							// 	<ListGroup horizontal>
// 							// 		<ListGroup.Item>Bio : {bio}</ListGroup.Item>
// 							// 		<ListGroup.Item>Commits : {commits}</ListGroup.Item>
// 							// 		<ListGroup.Item>Issues : {issues}</ListGroup.Item>
// 							// 		<ListGroup.Item>Tests : {tests}</ListGroup.Item>
// 							// 		<ListGroup.Item>LinkedIn : {linkedin}</ListGroup.Item>
// 							// 	</ListGroup>
// 							// 	</Card.Body>
// 							// </Card>
// 							// </Col>
// 						)
// 					})} */}
// 				</Row>
// 			) : (
// 				// TODO: add different data failed/not loaded placeholder
// 				<div>
// 				</div>
// 			)}

// 			<h1>Gitlab Combined Data</h1>
// 			<p>{groupCommits}</p>
// 			<p>{groupIssues}</p>
// 			<p>{groupTests}</p>
//         </div>
// 	)
// }

// export default About
