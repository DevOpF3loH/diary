import React, { useState } from "react";
import { FormControl, FormControlLabel, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Create() {
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className="field"
          label="Note Title"
          variant="standard"
          margin="normal"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className="field"
          label="Details"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl margin="normal" fullWidth>
        <FormLabel>Note Category</FormLabel>
        <RadioGroup
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          <FormControlLabel value="money" control={<Radio />} label="Money" />
          <FormControlLabel
            value="reminders"
            control={<Radio />}
            label="Reminders"
          />
          <FormControlLabel value="work" control={<Radio />} label="Work" />
        </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Create;
