import { authClient } from '@/lib/auth-client';
import { showToast } from '@/utils/Toast';
import React from 'react';
import { useRouter } from 'next/navigation';

const SocialSignBtn = () => {
    const router = useRouter();

    const SignInWithGoogle = async () => {
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
           if(error) {
                showToast.error('Sign In with Google Failed! Please try again.');
                return;
            }
            showToast.success('Sign In with Google Successful! Redirecting...');
            router.push('/');
        } catch (err) {
            showToast.error('An unexpected error occurred during Google Sign-In. Please try again.');
        }
    };

        const SignInWithGithub = async () => {
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
            if(error) {
                showToast.error('Sign In with GitHub Failed! Please try again.');
                return;
            }
            showToast.success('Sign In with GitHub Successful! Redirecting...');
            router.push('/');
            router.refresh(); // Ensure the session is updated after sign-in
            
        } catch (err) {
            showToast.error('An unexpected error occurred during GitHub Sign-In. Please try again.');
        }
    };


    return (
        <div>
               <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={SignInWithGoogle}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 px-4 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                    >
                        <svg className="size-4" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.6 3.6 1.7 7.4l3.7 2.9C6.3 7.1 8.9 5 12 5z"/>
                            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                            <path fill="#FBBC05" d="M5.4 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.7 7.2C.6 9.4 0 10.6 0 12s.6 2.6 1.7 4.8l3.7-2.1z"/>
                            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.7-2.1-6.6-5.3L1.7 15.9C3.6 19.7 7.4 23 12 23z"/>
                        </svg>
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={SignInWithGithub}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 px-4 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                    >
                        <svg className="size-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                    </button>
                </div>
        </div>
    );
};

export default SocialSignBtn;