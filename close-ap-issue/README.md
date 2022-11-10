# Close all issues associated with an AgilePlace Defect

The incoming payload from AgilePlace contains the card info from the Automation rule
on the board.

If you set a lane to have an automation to call the GitHub action with something like "close-ap-issue"
you can then use a workflow yml file like this:

```
name: Close Issue on Defect Completion
on:
  repository_dispatch
jobs:
  close-agileplace-issue:
    environment: Team Charlie
    runs-on: ubuntu-latest
    steps:
      - name: hydrate env
        run: echo "GHB_TOKEN=${{secrets.GH_TOKEN}}" >> $GITHUB_ENV
      - uses: actions/checkout@v3
      - name: close-issue
        if: github.event.action == 'close-ap-issue'
        uses:
          PVSCDemo/ap-actions/close-ap-issue@main
```

The conditional (if:) will make sure it only runs when the right incoming action string matches here

The close-ap-action code is set to look for issues that contain two tags: "AP Defect" and a cardId. To 
have a corresponding workflow that creates the issues correctly with the right tags, use this:

``` 
name: Defect Creation in AP
on:
  issues:
    types:
    - opened
jobs:
  create-defect:
    environment: Team Charlie
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: createdefect
        uses: PVSCDemo/github-actions/createCard@v1.1.3
        with:
          host: ${{secrets.LEANKIT_URL}}
          apiToken: ${{secrets.LEANKIT_API}}
          boardId: ${{secrets.BOARD_ID}}
          laneId: ${{secrets.LANE_ID}}
          title: ${{github.event.issue.title}}
          customId: ${{github.event.repository.name}} ${{github.event.issue.number}}
          externalLink: ${{github.event.issue.html_url}}
          typeId: ${{secrets.DEFECT_TYPE}}
      - id: labelissue
        uses: andymckay/labeler@e6c4322d0397f3240f0e7e30a33b5c5df2d39e90
        with:
          add-labels: "AP Defect, ${{steps.createdefect.outputs.createdCardId}}"
          repo-token: ${{ secrets.GH_TOKEN }}
      - id: commentissue
        uses: peter-evans/create-or-update-comment@a35cf36e5301d70b76f316e867e7788a55a31dae
        with:
          issue-number: ${{ github.event.issue.number }}
          body: |
            AgilePlace Defect Created
            ${{secrets.LEANKIT_URL}}/card/${{steps.createdefect.outputs.createdCardId}}
```

## Notes:

I have used an Environment to provide the secrets per team. You can delete those lines and just use 
repo secrets instead