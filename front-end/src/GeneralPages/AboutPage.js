import React, { useEffect, useState } from 'react'
import { Row, Col, Card, ListGroup, Tabs, Tab } from 'react-bootstrap'
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
		tests: 30,
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
		tests: 13,
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
		// Getting info from gitlab api on component load to have most up to date data.
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
									<Card.Img variant="top" src={picture} style={{ width: '100%', height: '100%' }} />
									<Card.Body style={{ backgroundColor: "#00008b", color: "white" }}>
										<Card.Title style={{ fontSize: '4vh' }}>{name}</Card.Title>
										<Card.Subtitle style={{ fontSize: '2vh' }} className="mb-2 text-muted">{role}</Card.Subtitle>
										<ListGroup>
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
			<div style={{ paddingTop: '4vh' }}>
				<Card>
					<Card.Header>
						<h1>Gitlab Combined Data</h1>
						<Row>
							<Col>
								<p>Total Commits: {groupCommits}</p>
							</Col>
							<Col>
								<p>Total Issues: {groupIssues}</p>
							</Col>
							<Col>
								<p>Total Tests: {groupTests}</p>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Tabs defaultActiveKey="api" id="uncontrolled-tab-example" className="mb-3">
							<Tab eventKey="api" title="APIs Used">
								<p><a href="https://gitlab.com/api/v4/projects/29831002/repository/contributors" target="_blank" rel="noopener noreferrer">Git Repo Contributor API</a>: Provides team contribution info for the About page</p>
								<p><a href="https://api.rescuegroups.org/v5/" target="_blank" rel="noopener noreferrer">Rescue Groups API</a>: Provides aggregated data for Adoption Centers, Adoptable Pets, and Different Breeds. This API
								was used by querying for all organizations (Adoption Centers) and all of the different Breeds. Then we used an endpoint under organizations to get all of the Adoptable Pets that were available at a given
								adoption center.</p>
								<p><a href="https://docs.thecatapi.com/" target="_blank" rel="noopener noreferrer">The Cat API</a>: Provides generic information about cat breeds. This API was used by searching for a specific breed name,
								if the breed was found in the API details were provided on the breeds life expectancy, average weight, friendlines, energy level, temperament and other information to help determine if a pet fits your lifestyle.</p>
								<p><a href="https://docs.thedogapi.com/" target="_blank" rel="noopener noreferrer">The Dog API</a>: Provides generic information about dog breeds. This API was used by searching for a specific breed name,
								if the breed was found in the API details were provided on the breeds life expectancy, average weight, friendlines, energy level, temperament and other information to help determine if a pet fits your lifestyle.</p>
								<p><a href="https://developers.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps API</a>: Provides information and graphics for provided locations (e.g. adoption centers). Adoption Center
								coordinates were provided by the Rescue Groups API and were leveraged here to provide embeded google map pages to help you locate how far away a given adoption center might be from you and how to get there.</p>
							</Tab>
							<Tab eventKey="tool" title="Tools Used">
								<ul>
									<li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> - front-end framework by Facebook to design and update simple views</li>
									<li><a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">React Bootstrap</a> - used for its prebuilt components like Card and Navbar</li>
									<li><a href="https://aws.amazon.com/amplify/" target="_blank" rel="noopener noreferrer">AWS Amplify</a> - used to deploy our website and connect to GitLab repository</li>
									<li><a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">Postman</a> - used to mock up api requests and to document our api</li>
									<li><a href="https://gitlab.com" target="_blank" rel="noopener noreferrer">GitLab</a> - used to host our code in a version control system</li>
									<li><a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer">NameCheap</a> - used to purchase the domain and manage DNS records</li>
									<li><a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html" target="_blank" rel="noopener noreferrer">Elastic Beanstalk</a> - used to quickly deploy and manage applications in the AWS Cloud</li>
									<li><a href="https://aws.amazon.com/rds/" target="_blank" rel="noopener noreferrer">Amazon Relational Database Service</a> - used to easily set up, operate, and scale a relational database in the cloud</li>
									<li><a href="https://www.selenium.dev/" target="_blank" rel="noopener noreferrer">Selenium</a> - used to automate testing of the website GUI</li>
									<li><a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer">Jest</a> - used as a JavaScript Testing Framework</li>
									<li><a href="https://flask.palletsprojects.com/en/2.0.x/" target="_blank" rel="noopener noreferrer">Flask</a> - used as a python web framework primarly to expose the backend REST API</li>
									<li><a href="https://www.sqlalchemy.org/" target="_blank" rel="noopener noreferrer">SQL Alchemy</a> - used as a python SQL toolkit and Object Relational Mapper to build and manage our SQL database</li>
									<li><a href="https://d3js.org" target="_blank" rel="noopener noreferrer">D3</a> - used to build a bubble chart visualization for pet breed counts and artwork genres</li>
									<li><a href="https://recharts.org" target="_blank" rel="noopener noreferrer">Recharts</a> - used to build pie chart and funnel charts for our data and our provider&apos;s-Gallery Gaze&apos;s data</li>
								</ul>
							</Tab>
							<Tab eventKey="link" title="Links">
								<a href="https://gitlab.com/10am-group-8/adopt-a-pet" target="_blank" rel="noopener noreferrer"><h3>GitLab Repo</h3></a>
								<a href="https://documenter.getpostman.com/view/17710041/UUy38kte" target="_blank" rel="noopener noreferrer"><h3>API Documentation</h3></a>
							</Tab>
						</Tabs>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default About
