/* Chain a few events in a functional manner
 * with traverse, Future and all kinds of
 * awesome functional tools.
 */
import React from 'react';
import Highlight from 'react-highlight';
import Problem from 'pages/components/problem';
import Solution from 'pages/components/solution';
import {Tags} from 'pages/components/ramda-helpers';

export default () => (
    <div className='content'>
        <Problem>
            <p>
                We have three endpoints:
            </p>
            <ol>
                <li>
                    <a href='http://jsonplaceholder.typicode.com/users/1' target='_blank'>
                        http://jsonplaceholder.typicode.com/users/<strong>{'<id>'}</strong>
                    </a>
                </li>
                <li>
                    <a href='http://jsonplaceholder.typicode.com/posts?userId=1' target='_blank'>
                        http://jsonplaceholder.typicode.com/posts?userId=<strong>{'<id>'}</strong>
                    </a>
                </li>
                <li>
                    <a href='http://jsonplaceholder.typicode.com/comments?postId=1' target='_blank'>
                        http://jsonplaceholder.typicode.com/comments?postId=<strong>{'<id>'}</strong>
                    </a>
                </li>
            </ol>
            <p>
                <small>It's <strong>OK</strong>, they're clickable ;)</small>
            </p>
            <p>
                We would like to <strong>fetch</strong> the user with an ID. <strong>then</strong> get all
                posts by that user and while we're at it, we need to
                get all comments for each post retrieved.
            </p>
            <p>
                <small>(see what I did there? got you in the mood of <strong>fetch</strong> api.)</small>
            </p>
            <p>
                We will also nest all posts under <strong>posts</strong> property and each post object will
                have a new <strong>comments</strong> property for fetched comments.
            </p>
        </Problem>
        <Solution>
            <p>
                Let's use an awesome <code>Future</code> monad here. First, we wrap our <code>fetch</code> in
                <code>Future</code>:
            </p>
            <Highlight className='javascript'>
                {`const httpGet = url =>
    new Future((reject, resolve) =>
        fetch(url)
            .then(res => res.json().then(resolve))
            .catch(reject));`}
            </Highlight>
            <p>
                And let's define our <code>GETs</code>:
            </p>
            <Highlight className='javascript'>
                {`const getUser = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/users/\${userId}\`);

const getPosts = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/posts?userId=\${userId}\`);

const getComments = postId =>
    httpGet(\`http://jsonplaceholder.typicode.com/comments?postId=\${postId}\`);`}
            </Highlight>
            <p>
                Now as per our example, we need to fetch the user and their posts using an ID. These two API calls
                do not need to depend on each other, because in our example, both, the user endpoint
                and the posts endpoint receive a <strong>userId</strong>.
            </p>
            <p>
                Therefore we can treat our <strong>Future</strong> as an applicative functor here:
            </p>
            <Highlight className='javascript'>
                {`const getUserWithPosts = id =>
    Future.of(user => posts => /* do something with user and posts */)
        .ap(getUser(id))
        .ap(getPosts(id));
`}
            </Highlight>
            <p>
                Now we can chain more the <strong>getComments</strong> call with <strong>getPosts</strong>, however
                we need to keep in mind that <strong>getPosts</strong> will return an array of posts and the result
                will be wrapped in <strong>Future</strong>. So if we <strong>map</strong> over them and
                call <strong>getComments</strong> for each post, we will end up
                with a Future of an Array of Future<strong>s</strong> of comment:
                <br/>
                <strong>Future ( Array ( Future ( comment ) ) )</strong>
            </p>
            <p>
                Instead, we will need to use <strong>traverse</strong> and this will give us a Future of Array of comments.
            </p>
            <p>
                We can also create a function that receives an object and an array, and nests an array under an object with a specified key.
            </p>
            <Highlight className='javascript'>
                {`const nestUnder = key => useWith(merge, [identity, objOf(key)]);

const getUserWithPosts = id =>
    Future.of(nestUnder('posts'))
        .ap(getUser(id))
        .ap(getPosts(id)
            .chain(traverse(Future.of, post => getComments(post.id)));
`}
            </Highlight>
            <p>
                {Tags(['traverse', 'merge', 'useWith', 'identity', 'objOf'])}
            </p>
            <p>
                And finally, we will do the same type of nesting, but for comments this time and here is the full code:
            </p>
            <Highlight className='javascript'>
                {`import R from 'ramda';
import { Future } from 'ramda-fantasy';

R.compose(R.map(([k, v]) => global[k] = v), R.toPairs)(R);

const httpGet = url =>
    new Future((reject, resolve) =>
        fetch(url)
            .then(res => res.json().then(resolve))
            .catch(reject));

const getUser = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/users/\${userId}\`);

const getPosts = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/posts?userId=\${userId}\`);

const getComments = postId =>
    httpGet(\`http://jsonplaceholder.typicode.com/comments?postId=\${postId}\`);

const nestUnder = key => useWith(merge, [identity, objOf(key)]);

const getUserWithPosts = id =>
    Future.of(nestUnder('posts'))
        .ap(getUser(id))
        .ap(getPosts(id)
            .chain(traverse(Future.of, post => getComments(post.id)
                .map(nestUnder('comments')(post)))));

getUserWithPosts(1).fork(console.error, console.log);
`}
            </Highlight>
            <p>
                {Tags(['traverse', 'merge', 'useWith', 'identity', 'objOf'])}
            </p>
        </Solution>
    </div>
);
