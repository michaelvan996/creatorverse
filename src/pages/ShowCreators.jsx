import React, { useState, useEffect } from 'react'
import { supabase } from '../client.js'
import { useNavigate } from 'react-router-dom'

import Card from '../components/Card.jsx'
import Nav from '../components/Nav.jsx'

async function fetchUsers() {
	const { data, error } = await supabase.from('creators').select("*");

	if (error) {
		console.log("Error fetching users:", error);
		return [];
	}

	return data || [];
}

const ShowCreators = () => {
	const [creators, setCreators] = useState([]);

	let navigate = useNavigate();
	const routeChange = (creator_id) => {
		let path = `/creator/` + `${creator_id}`;
		navigate(path)
	}

	useEffect(() => {
		async function getCreators() {
			const data = await fetchUsers();
			setCreators(data);
		}
		getCreators();
	}, []);

	return (
		<div>
			<Nav />
			<div className="gallery-container">
				<ul className="gallery">
					{creators.map(creator => (
						<div className="gallery-card" onClick={() => routeChange(creator.id)}>
							<Card 
								name={creator.name}
								url={creator.url}
								description={creator.description}
								imageURL={creator.imageURL}
							/>
						</div>
					))}
				</ul>
			</div>
		</div>
	)
}

export default ShowCreators