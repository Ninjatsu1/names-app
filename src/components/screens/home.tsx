import React from "react";
import { Typography, Button, Grid, Paper, Card, CardContent, CardActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Container, AppBar, Toolbar } from "@material-ui/core";

/**
 * Props
 */
interface Props { }

/**
 * State
 */
interface State {
  data: any;
  name: string;
  popularity: number
}



//Home screen
class Home extends React.Component<Props, State> {
  componentDidMount = () => {
    this.getData();
  }
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      name: "",
      popularity: 0
    }
  }
  public render = () => {
    return (
      <>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Name Application
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} style={{ marginTop: 10 }} justify="center">
          <Grid item xs={6}>
            <Card>
              <div style={{ margin: 10 }}>
                <Typography variant="h4" component="h4">
                  Nina's solution
                </Typography>
                <Typography variant="body1" component="p">
                  List names and amounts, order by amount, most popular first.
                </Typography>
              </div>
              <CardContent>
                <TableContainer>
                  <Table aria-label="Table for names sorted by popularity">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Popularity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.data.map((data: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell>
                            {data.name}
                          </TableCell>
                          <TableCell>
                            {data.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </>
    )
  }

  //Get data
  private getData = () => {
    fetch('./names.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then((response) => {
        //console.log(response)
        return response.json();
      })
      .then((namesData) => {
        let obj = namesData.names;
        obj.sort((a: any, b: any) => b.amount - a.amount);
        this.setState({
          data: obj
        })
      });
  }
}
export default Home;