import '@testing-library/jest-dom'
import 'bootstrap'

import { globalObject } from '$lib/common/globalObject'
import TestContainer from '$lib/common/containers/TestContainer'

globalObject.container = new TestContainer()
