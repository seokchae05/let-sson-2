import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import postboxbackg from "./postboxbackg.jpg";
// 선생이 받은 내역 목록
const Container = styled.div`
  width: 100%;
  /* 1rem = 16px */
  padding: 0.6rem;
  padding-top: 10%;
  background-image: url(${postboxbackg});
  background-size: cover;
  background-color: rgba(0, 0, 0, 0); ;
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto 10fr 4fr 8fr);
  grid-template-rows: repeat(1fr);
  gap: 30px;
  margin-left: 10%;
  margin-right: 10%;
  padding-left: 0px;
  border-radius: 10px;

  @media only screen and (max-width: 680px) {
    margin-top: 10%;
  }
`;

const Card = styled.li`
  border-top: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  background-color: white;
  color: black;
  display: flex;
  box-shadow: 3px 3px lightgrey;
  flex-direction: row;
  border-radius: 10px;
`;

const Cardelement1 = styled.div`
  padding-top: 2.5%;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 7%;
  text-align: center;
  align-items: center;
`;

const Cardelement2 = styled.div`
  border-left: 1px solid lightgrey;
  width: 50%;
  text-align: center;
  align-items: center;
`;

const Cardelement3 = styled.div`
  padding-top: 1.5%;
  width: 30%;
  text-align: right;
  flex-grow: 3;
  margin-right: 5%;
  align-items: center;
  color: grey;
`;

const Cardelement4 = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  width: 20%;
  text-align: center;
  flex-grow: 4;
`;

const Cardbutton = styled.button`
  border: none;
`;

const PostboxListRT = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getRecieve = async () => {
      const dataTRecieve = await axios
        .get("http://localhost:8080/teachers/getAllReceiving", {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        })
        .then(response => {
          console.log(dataTRecieve.data);
          setData(dataTRecieve.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    };
    getRecieve();
  }, []);

  const connected = tel => {
    axios
      .post(
        `http://localhost:8080/teachers/makeLetsson?student_tel=${tel}`,
        {
          student_tel: tel,
        },
        {
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      )
      .then(response => {
        alert("과외가 체결되었습니다.");
        history.push("/receivepost/tea");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const deleteSend = tel => {
    console.log(tel);

    if (window.confirm("정말로 받은 신청을 삭제하겠습니까?")) {
      axios
        .delete("http://localhost:8080/students/deleteSending", {
          data: { teacher_tel: tel },
          headers: { "X-AUTH-TOKEN": localStorage.getItem("token") },
        })
        .then(response => {
          alert("삭제 되었습니다. 페이지를 재접속하면 반영됩니다");
        });
    }
  };

  return (
    <Container>
      <CardList>
        {data.map((element, index) => (
          <Card key={element.id}>
            <Cardelement1>{index + 1}</Cardelement1>
            <Cardelement2>
              <Link
                to={{
                  pathname: "/postboxdetailS",
                  state: {
                    name: element.sender.name,
                    region: element.sender.region,
                    tel: element.sender.tel,
                    intro: element.sender.intro,
                    goal: element.sender.goal,
                  },
                }}
              >
                <Cardbutton>
                  {element.sender.name}님이 보낸 신청입니다.
                </Cardbutton>
              </Link>
            </Cardelement2>
            <Cardelement3>
              {element.create_date !== null && (
                <div>
                  {element.create_date.split("T")[0]}
                  <br></br>
                  {element.create_date.split("T")[1].substr(0, 8)}
                </div>
              )}
            </Cardelement3>
            <Cardelement4>
              <Cardbutton onClick={() => connected(element.sender.tel)}>
                진행
              </Cardbutton>
            </Cardelement4>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default PostboxListRT;
