'use strict';

const { getGithubContributions } = require( 'github-contributions-counter' )
require('dotenv').config()
/**
 * A set of functions called "actions" for `github-data`
 */

const getUsers = async () => {
  return await strapi.db.query( 'plugin::users-permissions.user' ).findMany( {} ).then( arr => {
    return arr.reduce( ( users, user ) => {
      if ( user.githubUsername ) {
        return [...users, user.githubUsername]
      }
      else {
        return users
      }
    }, [])
  } )
}
 const getData = async ( id ) => {
  return await getGithubContributions( {
    username: id,
    token: process.env.TOKEN
  } ).then( ( r ) => {
    console.log(r)
    const calendar = r.data.data.user.contributionsCollection.contributionCalendar
    const totalContributions = calendar.totalContributions
    let weeklyContributionsTemp = calendar.weeks.reduce( ( lastTwoWeeks, week, i ) => {
      if ( i >= calendar.weeks.length - 2 ) {
        let temp = week.contributionDays.reduce( ( count, day ) => ( [ ...count, day.contributionCount ] ), [] )
        return lastTwoWeeks.concat( temp )
      }
      else {
        return lastTwoWeeks
      }
    }, [] )
    const weeklyContributions = weeklyContributionsTemp.splice( weeklyContributionsTemp.length - 7, 7 )
    const weeklyContributionsSum = weeklyContributions.reduce((total, week) => total += week, 0)
    const dailyContributions = calendar.weeks[ calendar.weeks.length - 1 ].contributionDays.pop()?.contributionCount
    return { username: id,  totalContributions, weeklyContributions, weeklyContributionsSum, dailyContributions }
  } ).catch( e => {
    console.log(e)
    return "invalid user"
  })
}

module.exports = {
  master: async ( ctx, next ) => {
    try {
      // console.log(getGithubContributions.getGithubContributions)
      let temp = await getGithubContributions( {
        username: 'joel-samuel-raj',
        token: process.env.TOKEN
      } )
      ctx.body = temp.data
    } catch (err) {
      ctx.body = err;
    }
  },
  get: async ( ctx, next ) => {
    try {
      // console.log(getGithubContributions.getGithubContributions)
      ctx.body = await getData(ctx.params.id)
    } catch (err) {
      ctx.body = err;
    }
  },
  getAll: async ( ctx, next ) => {
    const users = await getUsers()
    console.log(users)
    const array = await users.reduce( async ( data, user ) => {
      data = await data
      let temp = await getData( user )
      console.log(temp)
      return data = [...data, temp]
    }, Promise.resolve( [] ) ).then( (arr) => {
      console.log(arr)
        const totalContributions = arr.reduce( ( total, user ) => total += user.totalContributions, 0 )
        const weeklyContributionsSum = arr.reduce( ( total, user ) => total += user.weeklyContributionsSum, 0 )
        const weeklyContributions = [0,0,0,0,0,0,0]
        for ( let i = 0; i < 7; i++ ) {
          weeklyContributions[i] = arr.reduce( ( total, user ) => total += user.weeklyContributions[ i ], 0 )
        }
      const dailyContributions = arr.reduce( ( total, user ) => total += user.dailyContributions, 0 )
      return {
        array: arr, totalContributions, weeklyContributionsSum, weeklyContributions, dailyContributions
      }
    } )
    ctx.body = await array
  }
};
