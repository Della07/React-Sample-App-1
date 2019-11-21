import React from 'react';
import { Input, Button, Table, Container } from 'semantic-ui-react'
import './App.css';

class App extends React.Component {

	state = {
		mode: 'ADD',
		first_name: '',
		last_name: '',
		persons: []
	}

	save = () => {

		if(this.state.mode === 'ADD') {
			console.log(this.state.persons);
			let genId = 0;
			if (this.state.persons.length === 0){
				genId = 1;
			} else {
				genId = this.state.persons[this.state.persons.length-1].id +1;
				console.log('genId', genId);
			}
			
			this.setState({
				persons: [
					...this.state.persons, {
					id: genId,
					first_name: this.state.first_name,
					last_name: this.state.last_name
					}
				],
				first_name: '',
				last_name: ''
			});
		} else {
			const { id, persons } = this.state;
			console.log(id);
			const index = persons.findIndex(person => person.id === id);
			console.log('index', index);
			const personsStart = persons.slice(0, index);
			console.log('start', personsStart);
			const personsEnd = persons.slice(index + 1);
			console.log('end', personsEnd);

			const updatedPersons = [
				...personsStart,
				{
					id: this.state.id,
					first_name: this.state.first_name,
					last_name: this.state.last_name
				},
				...personsEnd
			];

			console.log('update',updatedPersons);

			this.setState({
				persons: updatedPersons,
				id: '',
				first_name: '',
				last_name: '',
				mode: 'ADD'
			});

		}
		
	}

	delete = (id) => {
		
		const { persons } = this.state;
		console.log(id);
		const index = persons.findIndex(person => person.id === id);
		console.log('index', index);

		this.setState({
			persons: this.state.persons.filter((_, person) => person !== index)
		});
	}

	edit = (id) => {
		const { persons } = this.state;
		console.log(id);
		const index = persons.findIndex(person => person.id === id);
		console.log('index', index);

		const edit = this.state.persons.filter((_, person) => person === index);

		this.setState({
			id: edit[0].id,
			first_name: edit[0].first_name,
			last_name: edit[0].last_name,
			mode: 'EDIT'
		});

	}

	render(){
		console.log(this.state.mode);

		return (
			<Container className="App">
					<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
					Firstname: <Input 
									onChange={e => this.setState({ first_name: e.target.value }) } 
									value={this.state.first_name} 
									type='text'
									name="fname" 
								/>
					Lastname: <Input 
									onChange={e => this.setState({ last_name: e.target.value })} 
									value={this.state.last_name} 
									type='text' 
									name='lname'
								/>
				<Button onClick={()=> this.save()}>Submit</Button>

				<Container>
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell width='1'>ID</Table.HeaderCell>
								<Table.HeaderCell width='2'>Firstname</Table.HeaderCell>
								<Table.HeaderCell width='2'>Lastname</Table.HeaderCell>
								<Table.HeaderCell width='1'></Table.HeaderCell>
								<Table.HeaderCell width='1'></Table.HeaderCell>
							</Table.Row>
						</Table.Header>
							<Table.Body>
							{this.state.persons.map(person => (
								<Table.Row key={person.id}>
									<Table.Cell>{person.id}</Table.Cell>
									<Table.Cell>{person.first_name}</Table.Cell>
									<Table.Cell>{person.last_name}</Table.Cell>
									<Table.Cell><Button basic size="small" onClick={()=> this.delete(person.id)}>X</Button></Table.Cell>
									<Table.Cell><Button basic size="small" onClick={()=> this.edit(person.id)}>edit</Button></Table.Cell>
								</Table.Row>
							))}
							</Table.Body>
					</Table>
				</Container>
			</Container>
		);
	}
}

export default App1;
