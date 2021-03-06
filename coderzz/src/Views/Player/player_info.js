import React, { useState, useEffect } from 'react';
import "./player_info.css"
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Blank from '../blank.png'
import PlayerCharts from '../../Components/Charts/PlayerCharts.js';
import MikeTrout from '../../miketrout.png'

function Player(props) {

  const [loading, setloading] = useState(true);
  const [career, setcareer] = useState(0);
  const [year, setyear] = useState(0)
  const [player, setplayer] = useState([])
  const [sport, setsport] = useState("")
  const [statname1, setstatname1] = useState("")
  const [statname2, setstatname2] = useState("")
  const [statname3, setstatname3] = useState("")
  const [statname4, setstatname4] = useState("")
  const [statname5, setstatname5] = useState("")
  const [stat1, setstat1] = useState(0)
  const [stat2, setstat2] = useState(0)
  const [stat3, setstat3] = useState(0)
  const [stat4, setstat4] = useState(0)
  const [stat5, setstat5] = useState(0)
  useEffect(() => {
    setloading(true)
    setsport(props.sport)
    api(props.player, props.sport)
  }, [props.sport, props.player])

  function api(apiPlayer, apiSport) {
    fetch(`/${apiSport}/getplayer/${apiPlayer}`)
      .then(res => res.json())
      .then(
        (result) => {
          setplayer(result)
          let car = 0
          let max = 0
          for (let i = 0; i < result.length; i++) {
            let temp = 0
            if (result[i].index === 'Career') {
              setcareer(i)
              car = i
            }
            else if (result[i].index.includes("-")) {
              temp = parseInt(result[i].index.substring(0, 4))
            } else {
              temp = parseInt(result[i].index)
            }
            if (temp > max) {
              max = temp
            }
          }
          setyear(max)
          perSport(apiSport, result, car)
          setloading(false)
        },
        (error) => {
          console.log(error)
          setloading(false)
        }
      )
  }
  function perSport(spo, player, career) {
    switch (spo) {
      case "basketball":
        setstatname1("Points")
        setstatname2("Assists")
        setstatname3("Rebounds")
        setstatname4("Blocks")
        setstatname5("Player Efficiency Rating")
        setstat1(player[career].points)
        setstat2(player[career].assists)
        setstat3(player[career].total_rebounds)
        setstat4(player[career].blocks)
        setstat5(player[career].player_efficiency_rating)
        break
      case "baseball":
        setstatname1("Batting Average")
        setstatname2("On-Base Percentage")
        setstatname3("Slugging Percentage")
        setstatname4("Fielding Percentage")
        setstatname5("")
        setstat5("")
        setstat1(player[career].batting_average)
        setstat2(player[career].on_base_percentage)
        setstat3(player[career].slugging_percentage)
        setstat4(player[career].fielding_percentage)
        break
      case "football":
        console.log(player)
        for (let i = 0; i < player.length; i++) {
          switch (player[i].position.toUpperCase()) {
            case "C":
              break
            case "OG":
              break
            case "OT":
              break
            case "QB":
              setstatname1("Passing Yards")
              setstatname2("Rushing Yards")
              setstatname3("Quarterback Rating")
              setstatname4("Touchdowns")
              setstatname5("")
              setstat5("")
              setstat1(player[career].passing_yards)
              setstat2(player[career].rush_yards)
              setstat3(player[player.length - 2].espn_qbr)
              setstat4(parseInt(player[career].rushing_and_receiving_touchdowns) + parseInt(player[career].passing_touchdowns))
              break
            case "HB":
              break
            case "FB":
              break
            case "WR":
              break
            case "TE":
              break
            case "DT":
              break
            case "DE":
              setstatname1("Tackles")
              setstatname2("Interceptions")
              setstatname3("Sacks")
              setstatname4("Fumbles Forced")
              setstatname5("")
              setstat5("")
              setstat1(player[career].tackles)
              setstat2(player[career].interceptions)
              setstat3(player[career].sacks)
              setstat4(player[career].fumbles_forced)
              break
            case "LDE":
              setstatname1("Tackles")
              setstatname2("Interceptions")
              setstatname3("Sacks")
              setstatname4("Fumbles Forced")
              setstatname5("")
              setstat5("")
              setstat1(player[career].tackles)
              setstat2(player[career].interceptions)
              setstat3(player[career].sacks)
              setstat4(player[career].fumbles_forced)
              break
            case "RDE":
              setstatname1("Tackles")
              setstatname2("Interceptions")
              setstatname3("Sacks")
              setstatname4("Fumbles Forced")
              setstatname5("")
              setstat5("")
              setstat1(player[career].tackles)
              setstat2(player[career].interceptions)
              setstat3(player[career].sacks)
              setstat4(player[career].fumbles_forced)
              break
            case "MLB":
              break
            case "OLB":
              break
            case "CB":
              break
            case "S":
              break
          }
        }
        break
      case "hockey":
        setstatname1("Goals")
        setstatname2("Assists")
        setstatname3("Offensive Point Shares")
        setstatname4("Goals Created")
        setstatname5("")
        setstat5("")
        setstat1(player[career].goals)
        setstat2(player[career].assists)
        setstat3(player[career].offensive_point_shares)
        setstat4(player[career].goals_created)
        break
      
    }
  }

  function otherbslink() {
    return (`https://www.baseball-reference.com/req/202007270/images/headshots/c/${player[0].chadwick_id}_sabr.jpg`)
  }

  function linkGen(type, sport, id) {
    if (type === "player") {
      switch (sport) {
        case "basketball":
          return (`https://www.basketball-reference.com/req/202010061/images/players/${id}.jpg`)
          break
        case "football":
          return (`https://www.pro-football-reference.com/req/20180910/images/headshots/${id}_${year}.jpg`)
          break
        case "baseball":
          return (MikeTrout)
          break
        case "hockey":
          if (player[player.length - 2].index == "2019-20") {
            return (`https://www.hockey-reference.com/req/202008181/images/headshots/${id}-2020.jpg`)
          }
          else {
            return (`https://www.hockey-reference.com/req/202008181/images/headshots/${id}-2017.jpg`)
          }
      }
    }
    else if (type === "team") {
      switch (sport) {
        case "basketball":
          return (`https://d2p3bygnnzw9w3.cloudfront.net/req/202010091/tlogo/bbr/${id}-2020.png`)
        case "football":
          return (`https://d2p3bygnnzw9w3.cloudfront.net/req/202012013/tlogo/pfr/${id}-2020.png`)
        case "baseball":
          return (`https://d2p3bygnnzw9w3.cloudfront.net/req/202012013/tlogo/br/${id}-2020.png`)
        case "hockey":
          return (`https://d2p3bygnnzw9w3.cloudfront.net/req/202011201/tlogo/hr/${id}.png`)
        default:
          return (Blank)
      }
    }
  }


  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '5px' }}>
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  else if (!loading) {
    let playerTeamHistory = []
    if (sport != "football") {
      for (let i = 0; i < player.length; i++) {
        playerTeamHistory[i] = player[i].name
      }
      playerTeamHistory = [... new Set(playerTeamHistory)]
    }
    else {
      for (let i = 0; i < player.length; i++) {
        playerTeamHistory[i] = player[i].team
      }
      playerTeamHistory = [... new Set(playerTeamHistory)]
    }
    function printTeamHistory() {
      let teamArr = []
      for (let i = 0; i < playerTeamHistory.length; i++) {
        if (i === playerTeamHistory.length - 1) {
          teamArr.push(playerTeamHistory[i])
          break
        }
        teamArr.push(playerTeamHistory[i] + ", ")
      }
      return teamArr
    }

    return (
      <div className="hpage">
        <div className="card player_stat_card">
          <div className="card-body player_stat_body">
            <img className="card-img-top player_stat_img_item"
              src={linkGen("player", sport, player[0].player_id)}
              onError={otherbslink}
              alt={"Player Headshot Unavailable"} />
          </div>
          <div className="card player_stat_stats">
            <div className="card-body player_stat_body">
              <ul className="list-group player_stat_list">
                <li className="list-group-item"> {statname1}: {stat1} </li>
                <li className="list-group-item"> {statname2}: {stat2} </li>
                <li className="list-group-item"> {statname3}: {stat3} </li>
                <li className="list-group-item"> {statname4}: {stat4} </li>
              </ul>
            </div>
          </div>
          <div className="card player_stat_graph1">
            <div className="PlayerGraph">
              <PlayerCharts player1={player} title="offensive" />
            </div>
          </div>
          <div className="card player_info">
            <div className="card-body player_stat_body">
              <div className="card-text player_info_text">
                <h1> Player Name: {player[0].player_name}  </h1>
                <strong>Teams: </strong> {printTeamHistory()}
                <br />
                <strong>Last Team:</strong> {playerTeamHistory[playerTeamHistory.length - 1]}
                <br />
                <strong>Current Position:</strong> {player[player.length - 1].position}
                <br />
                <strong>Nationality: </strong> {player[player.length - 1].nationality}
                <br />
                <strong>{statname5} </strong> {stat5}
              </div>
            </div>
          </div>
          <div className="card season_info">
            <div className="card-body player_stat_body">
              <div className="card-text player_info_text">
                <h1 className="season_info_text"> Season Stats: Career  </h1>
              </div>
            </div>
          </div>
          <div className="card player_stat_graph2">
            <div className="PlayerGraph">
              <PlayerCharts player1={player} title="defensive" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Player;