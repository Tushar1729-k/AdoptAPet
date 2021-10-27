import React, { useEffect, useState } from 'react'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import TusharKohliImg from "./images/TusharKohliImg.jpg"
import NanduVudumulaImg from "./images/NanduVudumulaImg.jpg"
import SeanAujongImg from "./images/SeanAujongImg.jpg"
import SohumKapoorImg from "./images/SohumKapoorImg.jpg"
import EdwardChambleeImg from "./images/EdwardChambleeImg.png"

const teamContribution = [
	{
		name: "Sohum Kapoor",
		username: "sohumk",
		email: "4sohum@gmail.com",
		picture: SohumKapoorImg,
		role: "Back-End",
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
		picture: SeanAujongImg,
		role: "DevOps | Phase I leader",
		bio:
			"I'm a third year CS major at UT Austin. I'm from Dallas, Texas, but not the Plano area. In my free time, I enjoy going to HEB and trying different types of meats and vegetables. I also have my own recipe spreadsheet that I cook on a weekly schedule.",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Tushar Kohli",
		username: "tkohli",
		email: "kohli.tushar18@gmail.com",
		picture: TusharKohliImg,
		role: "Back-End | Front-End",
		bio:
			"I’m a third year CS major at UT Austin. I am from Arlington, Texas, home of the Dallas Cowboys! In my free time, I play video games, watch Netflix and hang out with friends",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Edward Chamblee",
		username: "edwardchamblee",
		email: "edwardchamblee@gmail.com",
		picture: EdwardChambleeImg,
		role: "DevOps",
		bio:
			"I'm a senior computer science student at UT Austin pursuing a career in cyber security. When I'm not working towards my degree, I lead a double-life as an esports host. My interest in the arcane parts of CS is closely tied to my role as one of two analysts for the Brawl Stars World Finals.",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Nandu Vudumula",
		username: "nandukrv",
		email: "nandukrv@gmail.com",
		picture: NanduVudumulaImg,
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
	await commitResponse.json().then(function (userCommitList) {
		userCommitList.forEach((user) => {
			// Map JSON fields we care about to variables
			const { name, email, commits } = user
			// Add commits to correct team member
			teamContribution.forEach((teamMember) => {
				if (teamMember.name === name || teamMember.username == name || teamMember.email === email)
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
	await issuesResponse.json().then(function (issueList) {
		issueList.forEach((issue) => {
			// Map JSON fields we care about to variables
			const { assignees } = issue
			assignees.forEach((assignee) => {
				const { name, username } = assignee
				// Add commits to correct team member
				teamContribution.forEach((teamMember) => {
					if (teamMember.name === name || teamMember.username == username)
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
		<div style={{ padding: '4vw' }}>
			<h1>About Adopt-A-Pet</h1>
			<p>
				Adopt-A-Pet serves as a one-stop website where potential pet owners research the best way to adopt their next pet.
				From lifestyle preferences to browsing adoption centers, this product speeds up the timeline from visiting the adoption center to bringing the pet home.
				Adopt-A-Pet emphasizes enabling compassionate pet owners and underserved adoption candidates.
				In particular, Adopt-A-Pet will provide information for adoption centers, different species and breeds, as well as adoptable pets.
			</p>

			<h1>Interesting result of integrating disparate data</h1>
			<p>
				By integrating the disparate data of Adoptable Pets, Adoption Center,
				and Species-Breeds, we found interesting relationships between them.
				An interesting (yet perhaps also a little morbid) trend that our team noticed
				was that &quot;high-energy&quot; pet breeds were the most commonly found breeds
				across shelters. These breeds include the American Pit Bull Terrier, Chihuahua,
				Labrador Retriever, German Shepherd, and Dachshund. On the other hand, in terms of
				dogs (one of the more popular species in adoption centers), Golden Retrievers
				are some of the most likely to be adopted. We believe that perhaps by educating
				our users with the know-how to take care of &quot;high-energy&quot; pet breeds
				that less of them will end up in the adoption center, and more will end up adopted.
			</p>

			<h1>Gitlab Individual Data</h1>
			{fetchedData ? (
				<Row xs={1} md={2} className="g-4">
					{groupMemberList.map((teamMember) => {
						const { name, username, email, picture, role, bio, commits, issues, tests } = teamMember
						return (
							<Col key={teamMember}>
								<Card>
									<Card.Img variant="top" src={picture} style={{ width: '100%', height: '400px' }} />
									<Card.Body>
										<Card.Title style={{ fontSize: '4vh' }}>{name}</Card.Title>
										<Card.Subtitle style={{ fontSize: '2vh' }} className="mb-2 text-muted">{role}</Card.Subtitle>
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
			{/* <br /> */}
			<a href="https://gitlab.com/10am-group-8/adopt-a-pet" target="_blank" rel="noopener noreferrer"><h1>GitLab Repo</h1></a>
			<br></br>
			<a href="https://documenter.getpostman.com/view/17710041/UUy38kte" target="_blank" rel="noopener noreferrer"><h1>API Documentation</h1></a>
			<br />
			<h1>APIs Used</h1>
			<p><a href="https://gitlab.com/api/v4/projects/29831002/repository/contributors" target="_blank" rel="noopener noreferrer">Git Repo Contributor API</a>: Provides team contribution info for the About page</p>
			{/* <br /> */}
			<p><a href="https://api.rescuegroups.org/v5/" target="_blank" rel="noopener noreferrer">Rescue Groups API</a>: Provides aggregated data for Adoption Centers</p>
			{/* <br /> */}
			<p><a href="https://docs.thecatapi.com/" target="_blank" rel="noopener noreferrer">The Cat API</a>: Provides generic information about cat breeds</p>
			{/* <br /> */}
			<p><a href="https://docs.thedogapi.com/" target="_blank" rel="noopener noreferrer">The Dog API</a>: Provides generic information about dog breeds</p>
			{/* <br /> */}
			<p><a href="https://developers.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps API</a>: Provides information and graphics for provided locations (e.g. adoption centers)</p>

			<h1>Tools Used</h1>
			<ul>
				<li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> - front-end framework by Facebook to design and update simple views</li>
				<li><a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">React Bootstrap</a> - used for its prebuilt components like Card and Navbar</li>
				<li><a href="https://aws.amazon.com/amplify/" target="_blank" rel="noopener noreferrer">AWS Amplify</a> - used to deploy our website and connect to GitLab repository</li>
				<li><a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">Postman</a> - used to mock up api requests and to document our api</li>
				<li><a href="https://gitlab.com" target="_blank" rel="noopener noreferrer">GitLab</a> - used to host our code in a version control system</li>
				<li><a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer">NameCheap</a> - used to purchase the domain and manage DNS records</li>
			</ul>

		</div>
	)
}

export default About
