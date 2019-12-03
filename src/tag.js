export const tag = `
<code><pre>
&lt;script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous">
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function() {
        $.get("https://shrouded-headland-00949.herokuapp.com/getAd?publisherId=YOUR_ID", function(data) {
            $("#YOUR_CONTAINER_ID").html(data);
        });
    });
&lt;/script&gt;
</pre></code>
`;