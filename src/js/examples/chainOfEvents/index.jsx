/* Chain a few events in a functional manner
 * with traverse, Future and all kinds of
 * awesome functional tools.
 */
import React from 'react';
import Highlight from 'react-highlight';
import Problem from 'pages/components/problem';
import Solution from 'pages/components/solution';
import { Tags } from 'pages/components/ramda-helpers';

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
                We would like to <strong>fetch</strong> the user first, with an ID. <strong>then</strong> get
                the ID prop from the <strong>JSON</strong> response (<em>for example's sake</em>), <strong>then</strong>
                get all posts by that user and while we're at it, we need to
                get all comments for each post retrieved.
            </p>
            <p>
                <small>(see what I did there? got you in the mood of <strong>fetch</strong> api.)</small>
            </p>
            <p>
                As a bonus, let's remove <strong>userId</strong> from each post and <strong>postId</strong> from
                each comment.
                Also, we will nest all posts under <strong>posts</strong> property and each post object will
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
                {`const getUser = id =>
    httpGet(\`http://jsonplaceholder.typicode.com/users/\${id}\`);

const getPosts = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/posts?userId=\${userId}\`);

const getComments = postId =>
    httpGet(\`http://jsonplaceholder.typicode.com/comments?postId=\${postId}\`);`}
            </Highlight>
            <p>
                ...and our main function. Well, we could stick with <code>dot</code> chaining and we could do:
            </p>
            <Highlight className='javascript'>
                {`// we kick things off by fetching the user first
const getUserWithPosts = id => getUser(id)
    // now that we have the user, we chain to another Future, in this case - getPosts
    .chain(user => getPosts(user.id)
        // and now for each post, we need to return a Future, but we don't want to end up with
        // [ Future response, Future response, Future response, ... ] but rather
        // Future([ response, response, response, ... ]). So we need to
        // flip the types around so to say. This is where traverse
        // comes in and since traverse will return us another
        // Future, we can chain to it straight away:
        .chain(traverse(Future.of, post => getComments(post.id)
            // and once we get all comments, we can start
            // destructuring and spreading things
            // to fit our goals
            .map(comments => ({
                // remember? we need to remove userId from each post
                ...dissoc('userId', post),
                // and postId from each comment
                comments: comments.map(dissoc('postId'))
            }))))
        // and finally, we spread the user and attach posts
        // with their precious comments.
        .map(posts => ({ ...user, posts }) ));

getUserWithPosts(1).fork(console.error, console.log);`}
            </Highlight>
            <p>
                {Tags(['traverse', 'dissoc'])}
            </p>
            <p>
                Let's re-think the whole thing in <code>ramda</code>:
                <br/>
                <small>some boilerplate first...</small>
            </p>
            <Highlight className='javascript'>
                {`const httpGet = url =>
    new Future((reject, resolve) =>
        fetch(url)
            .then(res => res.json().then(resolve))
            .catch(reject));

const getUser = id =>
    httpGet(\`http://jsonplaceholder.typicode.com/users/\${id}\`);

const getPosts = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/posts?userId=\${userId}\`);

const getComments = postId =>
    httpGet(\`http://jsonplaceholder.typicode.com/comments?postId=\${postId}\`);`}
            </Highlight>
            <p>
                Looking at our previous function, two things are clear - we need a function that will
                <code>dissoc</code> (remove)
                specific key from the list of things, be it <strong>posts</strong> or <strong>comments</strong> and at
                the same time, it should
                create a new object and nest itself under a pre-defined key, so to say. But since we will be
                dealing with a monad here,
                we need to <code>lift</code> things up:
            </p>
            <Highlight className='javascript'>
                {`const addRemoveKey = (withKey, withoutKey) =>
    lift(compose(objOf(withKey), map(dissoc(withoutKey))));`}
            </Highlight>
            <p>
                {Tags(['lift', 'compose', 'objOf', 'map', 'dissoc'])}
            </p>
            <p>
                And the second function, more of a function factory that will fetch a resource and merge
                it with another resource, for example - a <strong>user</strong> with <strong>posts</strong> and a single
                <strong>post</strong> with <strong>comments</strong>. It will do so by using the function above:
            </p>
            <Highlight className='javascript'>
                {`const mergeWithResource = (withKey, withoutKey, fn) => converge(lift(merge), [
    Future.of,
    compose(addRemoveKey(withKey, withoutKey), fn, prop('id'))
]);

const postWithComments = traverse(Future.of, mergeWithResource('comments', 'postId', getComments));
const userWithPosts = mergeWithResource('posts', 'userId', compose(chain(postWithComments), getPosts));`}
            </Highlight>
            <p>
                {Tags(['converge', 'lift', 'merge', 'compose', 'prop'])}
            </p>
            <p>
                And the final line, our main composition with <code>composeK</code> since we're dealing with a monad
                here:
            </p>
            <Highlight className='javascript'>
                {'const getUserWithPosts = composeK(userWithPosts, getUser);'}
            </Highlight>
            <p>
                {Tags(['composeK'])}
            </p>
            <p>
                Finally, the full code with 2 versions:
            </p>
            <Highlight>
                {`import R from 'ramda';
import Future from 'ramda-fantasy';

R.compose(R.map(([k, v]) => global[k] = v), R.toPairs)(R);

const httpGet = url =>
    new Future((reject, resolve) =>
        fetch(url)
            .then(res => res.json().then(resolve))
            .catch(reject));

const getUser = id =>
    httpGet(\`http://jsonplaceholder.typicode.com/users/\${id}\`);

const getPosts = userId =>
    httpGet(\`http://jsonplaceholder.typicode.com/posts?userId=\${userId}\`);

const getComments = postId =>
    httpGet(\`http://jsonplaceholder.typicode.com/comments?postId=\${postId}\`);


/* -------------------------- 1 -------------------------- */

const addRemoveKey = (withKey, withoutKey) =>
        lift(compose(objOf(withKey), map(dissoc(withoutKey))));

const mergeWithResource = (withKey, withoutKey, fn) => converge(lift(merge), [
    Future.of,
    compose(addRemoveKey(withKey, withoutKey), fn, prop('id'))
]);

const postWithComments = traverse(Future.of, mergeWithResource('comments', 'postId', getComments));
const userWithPosts = mergeWithResource('posts', 'userId', compose(chain(postWithComments), getPosts));

const getUserWithPosts = composeK(userWithPosts, getUser);


/* -------------------------- 2 -------------------------- */

const getUserWithPosts = id => getUser(id)
    .chain(user => getPosts(user.id)
        .chain(traverse(Future.of, post => getComments(post.id)
            .map(comments => ({
                ...dissoc('userId', post),
                comments: comments.map(dissoc('postId'))
            }))))
        .map(posts => ({ ...user, posts }) ));

/* ---------------------- END OF OR --------------------- */

getUserWithPosts(1).fork(console.error, console.log);
`}
            </Highlight>
        </Solution>
    </div>
);
