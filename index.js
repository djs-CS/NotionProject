// Extra Comment 2
// Extra Comment
// Install Packages
const dotenv = require ('dotenv').config();
const open = require('open')
const { Client } = require("@notionhq/client");

// Init client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const now = new Date()
const currentDate = [now.getFullYear(), now.getMonth(), now.getDate()].join("-");

async function getLastJournalEntry() {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
          and : [
            {
                property: 'Created',
                created_time: {
                    on_or_after	: currentDate,
                }

            },
            {
                property: "Entry Type",
                text : {
                equals: "Daily" 
                }
            }
          ]
        },
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
    });
    const result = response.results[0].url.replace("https", "notion");
    await open(result)
    console.log(result);
}
getLastJournalEntry()