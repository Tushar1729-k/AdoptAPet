import React, { useEffect, useState } from 'react'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

const teamContribution = [
    {
		name: "Sohum Kapoor",
		username: "sohumk",
		email: "4sohum@gmail.com",
		picture_path: "",
		role: "",
		bio:
			"I’m a fourth year CS Major with a minor in Business Management. I was born in New Jersey and spend my freetime cooking, gaming, and watching football.",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Sean Aujong",
		username: "seanaujong",
		email: "seanaujong@utexas.edu",
		picture_path: "",
		role: "",
		bio:
			"I'm a third year CS major at UT Austin. I'm from Dallas, Texas, but not the Plano area. In my free time, I enjoy going to HEB and trying different types of meats and vegetables. I also have my own recipe spreadsheet that I cook on a weekly schedule.",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Tushar Kohli",
		username: "tkohli",
		picture_path: "",
		email: "kohli.tushar18@gmail.com",
		role: "",
		bio:
			"",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Edward Chamblee",
		username: "",
		picture_path: "",
		email: "",
		role: "",
		bio:
			"",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Nandu Vudumala",
		username: "nandukrv",
		picture_path: "",
		email: "nandukrv@gmail.com",
		role: "Front End",
		bio: `I am a fourth year majoring in CS, and am from the San Francisco Bay Area, California.
			  I like youtube, working out, supporting the 49ers and Warriors, and binge watching/reading.`,
		commits: 0,
		issues: 0,
		tests: 0,
	}
]

const fetchGitLabApiInfo = async () => {
    let totalCommits = 0, totalIssues = 0, totalTests = 0

	// Zero out individual commits and issues so recorded commits & issues don't need to be recorded
    teamContribution.forEach((member) => {
        member.commits = 0
        member.issues = 0
		totalTests += member.tests
    })

	// Get commit information from GitLab API
    let commitResponse = await fetch("https://gitlab.com/api/v4/projects/29831002/repository/contributors")

	// Check that response is OK
	if (commitResponse.status !== 200) {
		return "Error fetching GitLab API data: " + commitResponse.status
	}

	// Process JSON from response
	await commitResponse.json().then(function(userCommitList){
		userCommitList.forEach((user) => {
			// Map JSON fields we care about to variables
			const {name, email, commits} = user
			// Add commits to correct team member
			teamContribution.forEach((teamMember) => {
				if(teamMember.name === name || teamMember.username == name || teamMember.email === email)
					teamMember.commits += commits
			})
			totalCommits += commits
		})
	})
	
	// Get issue information from GitLab API
	let issuesResponse = await fetch("https://gitlab.com/api/v4/projects/29831002/issues")

	// Check that response is OK
	if (issuesResponse.status !== 200) {
		return "Error fetching GitLab API data: " + issuesResponse.status
	}
	
	// Process JSON from response
	await issuesResponse.json().then(function(issueList){
		issueList.forEach((issue) => {
			// Map JSON fields we care about to variables
			const { assignees } = issue
			assignees.forEach((assignee) => {
				const {name, username}= assignee
				// Add commits to correct team member
				teamContribution.forEach((teamMember) => {
					if(teamMember.name === name || teamMember.username == username)
						teamMember.issues += 1
				})
			})
			totalIssues += 1
		})
	})
	
	return {
		groupCommits: totalCommits,
		groupIssues: totalIssues,
		groupTests: totalTests,
		groupContribution: teamContribution
	}

}

const About = () => {
	const [groupMemberList, setgroupMemberList] = useState([])
	const [groupCommits, setGroupCommits] = useState(0)
	const [groupIssues, setGroupIssues] = useState(0)
	const [groupTests, setGroupTests] = useState(0)
	const [fetchedData, setFetchedData] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (groupMemberList === undefined || groupMemberList.length === 0) {
				const gitlabApiInfo = await fetchGitLabApiInfo()
				setGroupCommits(gitlabApiInfo.groupCommits)
				setGroupIssues(gitlabApiInfo.groupIssues)
				setGroupTests(gitlabApiInfo.groupTests)
				setgroupMemberList(gitlabApiInfo.groupContribution)
				setFetchedData(true)
			}
		}
		fetchData()
	}, [groupMemberList])

	return (
		<div style={{padding: '4vw'}}>
			<h1>Gitlab Individual Data</h1>
			{fetchedData ? (
				<Row xs={1} md={2} className="g-4">
					{groupMemberList.map((teamMember) => {
						const {name, username, picture_path, email, role, bio, commits, issues, tests} = teamMember
						return (
							<Col key={teamMember}>
							<Card>
								<Card.Img variant="top" src={picture_path} style={{width: '100%', height: '400px'}} />
								<Card.Body>
								<Card.Title style={{fontSize: '4vh'}}>{name}</Card.Title>
								<Card.Subtitle style={{fontSize: '2vh'}} className="mb-2 text-muted">{role}</Card.Subtitle>
								<ListGroup horizontal>
									<ListGroup.Item>Bio : {bio}</ListGroup.Item>
									<ListGroup.Item>Commits : {commits}</ListGroup.Item>
									<ListGroup.Item>Issues : {issues}</ListGroup.Item>
									<ListGroup.Item>Tests : {tests}</ListGroup.Item>
									<ListGroup.Item>Username : {username}</ListGroup.Item>
									<ListGroup.Item>Email : {email}</ListGroup.Item>
								</ListGroup>
								</Card.Body>
							</Card>
							</Col>
						)
					})}
				</Row>
			) : (
				// TODO: add different data failed/not loaded placeholder
				<div>
				</div>
			)}

			<h1>Gitlab Combined Data</h1>
			<p>Total Commits: {groupCommits}</p>
			<p>Total Issues: {groupIssues}</p>
			<p>Total Tests: {groupTests}</p>
        </div>
	)
}

export default About
