export const tag = `
<pre>
	<code contenteditable spellcheck="false">
        $.get("https://shrouded-headland-00949.herokuapp.com/getAd?publisherId=YOUR_ID", function(data) {
            $("#YOUR_CONTAINER_ID").html(data);
        });
    </code>
</pre>
`;