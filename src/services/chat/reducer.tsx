import {IMAGES} from '~Root/config';
import {LIST_MATCHES_REQUESTED, LIST_MATCHES_SUCCESS, LIST_MATCHES_FAILURE} from './constants';
import {IChatState, STATUS_ENUM} from './types';

export const initialState: IChatState = {
  errors: [],
  loading: false,
  success: false,
  listMatches: [
    {
      id: '1',
      name: 'Kate Brady',
      image:
        'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1657497600&Signature=gZuZMLXM7ruCtV5HE0X5EhjiS7DL0G5cb6MoirJbEEBOJuuuLvqxFwIugIh4vs5o3EkDRZNZ0Holg4YHslLF-QjYBGD6ZUkUq5lAfCu8FsSopFfAzUxYByxxg5E3y--31kn5~cUtbigLx1s2btTiMA94AdGitSQ6r9aEMz~Ts~c~PaTVqTzW1q3yRuGaUFPlh4K7heRL36SVhzYraY3hqGz4GrZVh~Ja~BnM9F1a9C~OBFnxh3F5z-Xo4~lq5BOoK4WwVToNDatH5O83Ae8qsrV8OIXeiq0IYcLv7LoxVM2Bc-~k-UzQN4~2fVoIjaJIApZ3QB8ld6KU1syApBc9Sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      id: '2',
      name: 'Jack Carlyle',
      image:
        'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1657497600&Signature=gZuZMLXM7ruCtV5HE0X5EhjiS7DL0G5cb6MoirJbEEBOJuuuLvqxFwIugIh4vs5o3EkDRZNZ0Holg4YHslLF-QjYBGD6ZUkUq5lAfCu8FsSopFfAzUxYByxxg5E3y--31kn5~cUtbigLx1s2btTiMA94AdGitSQ6r9aEMz~Ts~c~PaTVqTzW1q3yRuGaUFPlh4K7heRL36SVhzYraY3hqGz4GrZVh~Ja~BnM9F1a9C~OBFnxh3F5z-Xo4~lq5BOoK4WwVToNDatH5O83Ae8qsrV8OIXeiq0IYcLv7LoxVM2Bc-~k-UzQN4~2fVoIjaJIApZ3QB8ld6KU1syApBc9Sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      id: '3',
      name: 'Sanjeev Kapur',
      image:
        'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1657497600&Signature=gZuZMLXM7ruCtV5HE0X5EhjiS7DL0G5cb6MoirJbEEBOJuuuLvqxFwIugIh4vs5o3EkDRZNZ0Holg4YHslLF-QjYBGD6ZUkUq5lAfCu8FsSopFfAzUxYByxxg5E3y--31kn5~cUtbigLx1s2btTiMA94AdGitSQ6r9aEMz~Ts~c~PaTVqTzW1q3yRuGaUFPlh4K7heRL36SVhzYraY3hqGz4GrZVh~Ja~BnM9F1a9C~OBFnxh3F5z-Xo4~lq5BOoK4WwVToNDatH5O83Ae8qsrV8OIXeiq0IYcLv7LoxVM2Bc-~k-UzQN4~2fVoIjaJIApZ3QB8ld6KU1syApBc9Sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      id: '4',
      name: 'Alex Do',
      image:
        'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1657497600&Signature=gZuZMLXM7ruCtV5HE0X5EhjiS7DL0G5cb6MoirJbEEBOJuuuLvqxFwIugIh4vs5o3EkDRZNZ0Holg4YHslLF-QjYBGD6ZUkUq5lAfCu8FsSopFfAzUxYByxxg5E3y--31kn5~cUtbigLx1s2btTiMA94AdGitSQ6r9aEMz~Ts~c~PaTVqTzW1q3yRuGaUFPlh4K7heRL36SVhzYraY3hqGz4GrZVh~Ja~BnM9F1a9C~OBFnxh3F5z-Xo4~lq5BOoK4WwVToNDatH5O83Ae8qsrV8OIXeiq0IYcLv7LoxVM2Bc-~k-UzQN4~2fVoIjaJIApZ3QB8ld6KU1syApBc9Sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
  ],
  peopleToAsks: [
    {
      asker: null,
      data: [
        {
          id: 1,
          first_name: 'Stephen',
          last_name: 'Hawk',
          introduction: 'Oh I remember what I need now...let me create an Ask and share with you...',
          created_at: '2022-06-27T00:00:00.000Z',
          is_pin: true,
          avatar_url: 'https://s3-alpha-sig.figma.com/img/052f/0e55/5815e2ea5deab12b66028e05487391c2?Expires=1657497600&Signature=R7ZRkdgZJJlJLG64N6JGLcfEoUBt8EbTWAxKMTZzroo1UfUQjrALBAAVxbUbKtS4lFrLTuCB-26mWTLZYloYs2xlCDQRbVay84ZnuJvjdO43NALnMzVfa9Aw8PuAbB955Y04FkTC9bznIxznVgfNfYguNTaipXjyr2kum2e17x5zVYnqgd8bDnFKH2OWbKF7hoJ4bnVOkDt-eJw4Qc1frBVnnk7GJXkbmEpaBcwejVHDE9JjbbZ~2tfsm46dXw1E5kd9l59AKqv0ALaE5ZXzEkC2gKx8zA69sGM-ianQBt1YAl15eS01afoOu8FZS8XGdpY~DXqzNuEjJQGNT9C-sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        },
      ],
    },
    {
      asker: null,
      data: [
        {
          id: 2,
          first_name: 'Stephen',
          last_name: 'Hawk',
          introduction: 'Oh I remember what I need now...let me create an Ask and share with you...',
          created_at: '2022-06-27T00:00:00.000Z',
          is_pin: true,
          avatar_url: 'https://s3-alpha-sig.figma.com/img/052f/0e55/5815e2ea5deab12b66028e05487391c2?Expires=1657497600&Signature=R7ZRkdgZJJlJLG64N6JGLcfEoUBt8EbTWAxKMTZzroo1UfUQjrALBAAVxbUbKtS4lFrLTuCB-26mWTLZYloYs2xlCDQRbVay84ZnuJvjdO43NALnMzVfa9Aw8PuAbB955Y04FkTC9bznIxznVgfNfYguNTaipXjyr2kum2e17x5zVYnqgd8bDnFKH2OWbKF7hoJ4bnVOkDt-eJw4Qc1frBVnnk7GJXkbmEpaBcwejVHDE9JjbbZ~2tfsm46dXw1E5kd9l59AKqv0ALaE5ZXzEkC2gKx8zA69sGM-ianQBt1YAl15eS01afoOu8FZS8XGdpY~DXqzNuEjJQGNT9C-sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        },
      ],
    },
    {
      asker: {
        avatar_url:
          'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        demographic: 'are looking for',
        business_requirement: 'an advertising agency',
      },
      data: [
        {
          id: 3,
          first_name: 'Stephen',
          last_name: 'Hawk',
          introduction: 'This guy is legit! I’ve worked with him. Check him out...',
          created_at: '2022-06-27T00:00:00.000Z',
          is_pin: true,
          avatar_url:
            'https://s3-alpha-sig.figma.com/img/052f/0e55/5815e2ea5deab12b66028e05487391c2?Expires=1657497600&Signature=R7ZRkdgZJJlJLG64N6JGLcfEoUBt8EbTWAxKMTZzroo1UfUQjrALBAAVxbUbKtS4lFrLTuCB-26mWTLZYloYs2xlCDQRbVay84ZnuJvjdO43NALnMzVfa9Aw8PuAbB955Y04FkTC9bznIxznVgfNfYguNTaipXjyr2kum2e17x5zVYnqgd8bDnFKH2OWbKF7hoJ4bnVOkDt-eJw4Qc1frBVnnk7GJXkbmEpaBcwejVHDE9JjbbZ~2tfsm46dXw1E5kd9l59AKqv0ALaE5ZXzEkC2gKx8zA69sGM-ianQBt1YAl15eS01afoOu8FZS8XGdpY~DXqzNuEjJQGNT9C-sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          introducer: [
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          ],
        },
        {
          id: 4,
          first_name: 'Liam',
          last_name: 'Mater',
          introduction: 'He’s the best. But be prepared for the budget you’ll need...',
          created_at: '2022-06-27T00:00:00.000Z',
          is_pin: true,
          introducer: [
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          ],
        },
      ],
    },
    {
      asker: {
        avatar_url:
          'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        demographic: 'are looking for',
        business_requirement: 'an marketing manager',
      },
      data: [
        {
          id: 3,
          first_name: 'Stephen',
          last_name: 'Hawk',
          introduction: 'This guy is legit! I’ve worked with him. Check him out...',
          created_at: '2022-06-27T00:00:00.000Z',
          is_pin: true,
          avatar_url:
            'https://s3-alpha-sig.figma.com/img/052f/0e55/5815e2ea5deab12b66028e05487391c2?Expires=1657497600&Signature=R7ZRkdgZJJlJLG64N6JGLcfEoUBt8EbTWAxKMTZzroo1UfUQjrALBAAVxbUbKtS4lFrLTuCB-26mWTLZYloYs2xlCDQRbVay84ZnuJvjdO43NALnMzVfa9Aw8PuAbB955Y04FkTC9bznIxznVgfNfYguNTaipXjyr2kum2e17x5zVYnqgd8bDnFKH2OWbKF7hoJ4bnVOkDt-eJw4Qc1frBVnnk7GJXkbmEpaBcwejVHDE9JjbbZ~2tfsm46dXw1E5kd9l59AKqv0ALaE5ZXzEkC2gKx8zA69sGM-ianQBt1YAl15eS01afoOu8FZS8XGdpY~DXqzNuEjJQGNT9C-sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          introducer: [
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          ],
        },
        {
          id: 4,
          first_name: 'Liam',
          last_name: 'Mater',
          introduction: 'He’s the best. But be prepared for the budget you’ll need...',
          created_at: '2022-06-27T00:00:00.000Z',
          is_pin: true,
          introducer: [
            'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1657497600&Signature=RAn6gjTWpryn6wpLeJoq2XylRiNYG~0WQx0rbYjqC8WNDHKnXaciklIRgH22stWKiwMCr-Hp-U~IQeX~nsgQabD8eBl2N5Jkbke6ahatLoXAAn7M1AmR-IkldRvoqJ3EusCdStl5LauZE9I8KQi6dJoFQ892D~iOFp3TYEa0x6fa9sO6jjIiJ2Mkx5IX7jbgPJsl9BUWASjy6MEOv5li0IhJ7yrPiEr7eQ2Wms2RHpIv2ktOM85Lnhnb2aLlSVIB2SRtoUNOtaz3MQGa3ahdVxieuuqx9vI6qM0FQ~fKTlFihSRDmOs0nLX39UywY3oIJ3YpEgZbC8GQn17MQQ0Ilw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          ],
        },
      ],
    },
  ],
  callback: () => {},
};

const userReducer = (state: IChatState = initialState, action: any): IChatState => {
  switch (action.type) {
    case LIST_MATCHES_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case LIST_MATCHES_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case LIST_MATCHES_FAILURE:
      return {...state, loading: false, errors: [...action.payload.error]};
    default:
      return state;
  }
};

export default userReducer;
