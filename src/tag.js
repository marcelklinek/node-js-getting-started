export const tag = `
<pre>
    <script>
        $.get("https://shrouded-headland-00949.herokuapp.com/getAd?publisherId=YOUR_ID", function(data) {
            $("#YOUR_CONTAINER_ID").html(data);
        });
    </script>
</pre>
`;