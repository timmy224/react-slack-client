import React from 'react';

function Challenge() {

	return(
		<form action="http://localhost:5000/userinfo/" method="post" target="_blank">
			{/*<input type="text" placeholder='Your Name' value="name"/>
			<input type="text" placeholder="Username" value="username"/>
			<input type="email" placeholder="Email Address" value="email"/>*/}
			<input name="name" type="text" placeholder='Your Name'/>
			<input name="username" type="text" placeholder="Username"/>
			<input name="email" type="email" placeholder="Email Address"/>
			<input type="submit" value="Submit"/>
		</form>
		)
}

export default Challenge;